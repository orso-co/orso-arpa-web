/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map, share } from 'rxjs';
import { ColumnDefinition } from '../../models/table/column';

import { PrimeTemplate, SelectItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ArpaTableColumnDirective } from './table-column.directive';
import { SelectValueService } from '@arpa/services';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FeedScope } from '@arpa/core';

@Component({
  selector: 'arpa-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RatingModule,
    StatusBadgeComponent,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input()
  showFilter: boolean = true;

  @Input()
  addNew = false;

  @Input()
  columnFilter = false;

  @Input()
  rows: number = 20;

  @Input()
  rowsPerPage: number[] = [20, 50, 100, 200];

  @Input()
  showPagination: boolean = true;

  @Input()
  showJumpToPageDropdown: boolean = false;

  @Input()
  showFirstLastIcon: boolean = true;

  @Input()
  showPageLinks: boolean = true;

  @Input()
  data: Observable<unknown[]> | undefined;

  @Input()
  feed: FeedScope | undefined;

  @Input()
  values: Observable<unknown[]> | undefined;

  @Input()
  tableStyleClass: string | undefined;

  @Input()
  selectionMode: 'single' | 'multiple' | undefined | null;

  @Input()
  filterFields: string[] = [];

  @Input()
  primaryKey: string = 'id';

  @Input()
  scrollHeight: string = 'flex';

  @Input()
  scrollable: boolean = true;

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDefinition<any>[] = [];

  @Output()
  filterEvents: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  paginationEvents: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  lazyEvents: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  rowSelectEvents: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  rowClickEvents: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Input()
  actionsTemplateRef: TemplateRef<unknown> | undefined;

  @Input()
  rowTemplateRef: TemplateRef<unknown> | undefined;

  @Input()
  rowExpansionTemplateRef: TemplateRef<unknown> | undefined;

  @Input()
  isLoading = false;
  @ContentChildren(PrimeTemplate) templates:
    | QueryList<PrimeTemplate>
    | undefined;
  public lazy: boolean = false;
  public hasFilters: boolean = false;
  private stateStreams: Record<string, Observable<any>> = {};
  @ContentChildren(ArpaTableColumnDirective, { read: ArpaTableColumnDirective })
  private columnTemplateRefs: QueryList<ArpaTableColumnDirective> | undefined;
  private columnTemplates: Record<string, TemplateRef<any>> = {};
  private loadingEventSubscription: Subscription | undefined;
  private filterEventSubscription: Subscription | undefined;

  constructor(
    private cdRef: ChangeDetectorRef,
    private selectValueService: SelectValueService
  ) {}

  get activeColumns() {
    return this.columns.filter((column) => column.show ?? true);
  }

  get hasFilterColumns() {
    return (
      this.columns.filter((column) => column.show !== undefined).length > 0
    );
  }

  resolveState(
    table: string,
    id: string,
    property: string = 'State'
  ): Observable<string | undefined> {
    const key = `${table}|${property}`;
    if (!this.stateStreams[key]) {
      this.stateStreams[key] = this.selectValueService
        .get(table, property)
        .pipe(share());
    }
    return this.stateStreams[key].pipe(
      map((items: SelectItem[]) => {
        const item = items.find((i) => i.value === id);
        return item ? item!.label!.toLowerCase() : undefined;
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolveValue(path: string, source: any): any {
    const props = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return props.reduce(
      (prev: Record<string, any>, current: string) => prev?.[current],
      source
    );
  }

  clear(table: Table) {
    table.filterGlobal(null, 'contains');
    this.hasFilters = false;
  }

  ngOnInit(): void {
    this.filterEventSubscription = this.filterEvents.subscribe(() => {
      this.hasFilters = true;
    });
    if (this.feed) {
      this.isLoading = true;
      this.loadingEventSubscription = this.feed.isLoading.subscribe(
        (v) => (this.isLoading = v)
      );
      this.lazy = true;
      this.data = this.feed.values;
      this.feed.onFilter({ variables: { take: this.rows } });
    } else if (this.values) {
      this.data = this.values;
    }
    if (this.filterFields.length === 0) {
      this.columns.forEach((def) => {
        this.filterFields.push(def.property);
      });
    }
  }

  trackByProperty<T extends Record<string, any>>(
    index: number,
    column: ColumnDefinition<T>
  ) {
    return column.property;
  }

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      if (item.getType() === 'actions') {
        this.actionsTemplateRef = item.template;
      }
    });
    this.columnTemplateRefs?.forEach((item) => {
      this.columnTemplates[item.name] = item.template;
      this.cdRef.detectChanges();
    });
  }

  getTemplate(template: string) {
    return this.columnTemplates[template];
  }

  ngOnDestroy(): void {
    this.filterEventSubscription?.unsubscribe();
    if (this.loadingEventSubscription) {
      this.loadingEventSubscription.unsubscribe();
    }
  }

  get exportColumns() {
    return this.columns.map((col) => ({
      field: col.property,
      header: col.label,
    }));
  }
}
