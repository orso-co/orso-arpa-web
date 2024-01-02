/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { FeedScope } from '../../models/feed';

@Injectable()
export class GraphqlFeedService {
  constructor(private apollo: Apollo) { }

  getInstance(props: { query: DocumentNode, variables: { [prop: string]: string | number }}): FeedScope {
    return new FeedScope(this.apollo, props);
  }
}
