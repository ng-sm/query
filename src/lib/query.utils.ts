import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Query, QueryStatus } from './query.model';

export const hasQueryStatus = (query: Query<any>): boolean => query && !!query.status;
export const isQueryInProgress = (query: Query<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.InProgress;
export const hasQueryFailed = (query: Query<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Failure;
export const hasQuerySucceeded = (query: Query<any>): boolean => hasQueryStatus(query) && query.status === QueryStatus.Success;
export const isQueryFinished = (query: Query<any>): boolean => hasQueryStatus(query) && query.status !== QueryStatus.InProgress;

export const getQueryStatus = (query: Query<any>) => ({
  success: hasQuerySucceeded(query),
  error: hasQueryFailed(query),
  pending: isQueryInProgress(query),
});

export const isQueryInProgress$ = (queries: Observable<Query<any>>[]): Observable<boolean>  => {
  return combineLatest(queries).pipe(map(data => data.some(query => isQueryInProgress(query))));
};
