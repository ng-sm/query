import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueryResponse } from '../query.model';
import { QueryState, QUERY_STORE_KEY } from './query.state';
import { HttpResponse } from '@angular/common/http';

export const queryState = createFeatureSelector<QueryState>(QUERY_STORE_KEY);

export const isInProgress = (groupName: string) => createSelector(
  queryState,
  (state: QueryState) => state.groups[groupName]?.isInProgress || null,
);

const getQuery = <T>(state: QueryState, name: string): QueryResponse<HttpResponse<T>> => state.queries[name] as QueryResponse<HttpResponse<T>> || null;

export const query = <T>(queryName: string) => createSelector(
  queryState,
  (state: QueryState) => getQuery<T>(state, queryName)
);

export const body = <T>(queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery<T>(state, queryName);
    return query?.response?.body || null;
  }
);

export const response = <T>(queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery<T>(state, queryName);
    return query?.response || null;
  }
);

export const error = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery(state, queryName);
    return query?.error || null;
  }
);

export const status = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery(state, queryName);
    return query?.status || null;
  }
);
