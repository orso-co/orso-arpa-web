import { TestBed } from '@angular/core/testing';

import { GraphqlFeedService } from './graphql-feed.service';

describe('GraphqlFeedService', () => {
  let service: GraphqlFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
