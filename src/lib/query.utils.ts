import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queries, QueryResponse, QueryStatus } from './query.model';

export const hasQueryStatus = (query: QueryResponse<unknown>): boolean => query && !!query.status;
export const isQueryInProgress = (query: QueryResponse<unknown>): boolean => hasQueryStatus(query) && query.status === QueryStatus.InProgress;
export const hasQueryFailed = (query: QueryResponse<unknown>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Failure;
export const hasQuerySucceeded = (query: QueryResponse<unknown>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Success;
export const isQueryFinished = (query: QueryResponse<unknown>): boolean => hasQueryStatus(query) && query.status !== QueryStatus.InProgress;

export const isQueryGroupInProgress = (data: Queries[]): boolean  => {
  const queries = Object.values(data) as unknown as QueryResponse<unknown>[];
  return queries.some(query => isQueryInProgress(query));
};

export const isQueryInProgress$ = (queries: Observable<QueryResponse<unknown>>[]): Observable<boolean>  => {
  return combineLatest(queries).pipe(map(data => data.some(query => isQueryInProgress(query))));
};
