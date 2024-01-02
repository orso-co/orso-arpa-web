import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDefinition, TableComponent, TitleService } from '@arpa/ui';
import { AuditLogDto, FeedScope, GraphqlFeedService, ProjectDto } from '@arpa/core';
import { AuditLogQuery } from './audit-log.graphql';

@Component({
  selector: 'arpa-audit-logs',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.scss',
})
export class AuditLogsComponent implements OnInit {
  feed: FeedScope | undefined

  constructor(private titleService: TitleService,
    private graphQlService: GraphqlFeedService) {}

  ngOnInit(): void {
    this.titleService.setTitle($localize`Audit Logs`);
    this.feed = this.graphQlService.getInstance({ query: AuditLogQuery, variables: {} });
  }

  public query = AuditLogQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'TABLE', property: 'tableName', type: 'text' },
    { label: 'TYPE', property: 'type', type: 'text' },
    { label: 'CHANGED_AT', property: 'createdAt', type: 'date' },
    { label: 'CHANGED_BY', property: 'createdBy', type: 'text' },
    { label: 'CHANGED_COLUMNS', property: 'changedColumns', type: 'text' },
  ];

  onRowClick(auditLogDto: AuditLogDto) {
    /*this.dialogService.open(AuditDialogComponent, {
      data: {
        auditLogDto,
      },
      header: this.translate.instant('audit-log.DETAILS'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });*/
    console.log({ auditLogDto });
  }
}
