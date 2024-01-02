/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject } from 'rxjs';

export class FeedScope {
  private query: DocumentNode;
  private variables: { [prop: string]: string | number }
  private feedQuery: QueryRef<any, Record<string, any>>;

  isLoading = new EventEmitter<boolean>();
  totalCount = new BehaviorSubject<number>(0);
  values= new BehaviorSubject<unknown[]>([]);
  hasNextPage = new BehaviorSubject<boolean>(false);
  hasPreviousPage = new BehaviorSubject<boolean>(false);

  constructor(private apollo: Apollo, props: { query: DocumentNode, variables: { [prop: string]: string | number }}) {
    this.query = props.query;
    this.variables = props.variables;

    this.feedQuery = this.apollo.watchQuery<any>({
      query: this.query,
      variables: {
        searchQuery: '',
        ...this.variables,
      },
      notifyOnNetworkStatusChange: true,
      useInitialLoading: true,
      returnPartialData: false,
    });
  }

  onFilter({ filter, variables }: any): any {
    this.isLoading.emit(true);
    return this.feedQuery
      .fetchMore({
        variables: {
          ...this.variables,
          ...variables,
          searchQuery: filter || '',
        },
      })
      .then(this.onDataFetch.bind(this));
  }

  onLazy({ first, rows, globalFilter, multiSortMeta }: any): any {
    this.isLoading.emit(true);
    const sortOrder: Record<string, string> = {};
    if (multiSortMeta) {
      multiSortMeta.forEach(({ field, order }: any) => {
        sortOrder[`order${field[0].toUpperCase() + field.substring(1).replaceAll('.', '__')}`] = order === -1 ? 'ASC' : 'DESC';
      });
    }
    return this.moveCursor(rows, first, globalFilter || '', sortOrder);
  }

  private moveCursor(take: number, skip: number = 0, searchQuery: string = '', order = {}) {
    return this.feedQuery
      .fetchMore({
        variables: {
          ...this.variables,
          ...order,
          searchQuery,
          take,
          skip,
        },
      })
      .then(this.onDataFetch.bind(this));
  }

  private onDataFetch(queryResult: any) {
    const { loading, data } = queryResult;
    this.isLoading.emit(loading);
    if (Array.isArray(data)) {
      this.values.next(data);
    } else if (data) {
      const type = Object.keys(data)[0];
      if (type && data[type]) {
        this.hasNextPage.next(data[type].pageInfo?.hasNextPage);
        this.hasPreviousPage.next(data[type].pageInfo?.hasPreviousPage);
        this.values.next(data[type].items || []);
        this.totalCount.next(data[type].totalCount || 0);
      } else {
        this.hasNextPage.next(false);
        this.hasPreviousPage.next(false);
        this.values.next([]);
        this.totalCount.next(0);
      }
    }
  }
}
