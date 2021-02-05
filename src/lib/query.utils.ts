import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queries, QueryResponse, QueryStatus } from './query.model';

export const hasQueryStatus = (query: QueryResponse<any>): boolean => query && !!query.status;
export const isQueryInProgress = (query: QueryResponse<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.InProgress;
export const hasQueryFailed = (query: QueryResponse<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Failure;
export const hasQuerySucceeded = (query: QueryResponse<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Success;
export const isQueryFinished = (query: QueryResponse<any>): boolean => hasQueryStatus(query) && query.status !== QueryStatus.InProgress;

export const isQueryGroupInProgress = (querieDatas: Queries[]): boolean  => {
  const queries = Object.values(querieDatas) as any;
  return queries.some(query => isQueryInProgress(query));
};

export const isQueryInProgress$ = (queries: Observable<QueryResponse<any>>[]): Observable<boolean>  => {
  return combineLatest(queries).pipe(map(data => data.some(query => isQueryInProgress(query))));
};
