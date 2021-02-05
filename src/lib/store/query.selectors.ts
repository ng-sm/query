import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QueryResponse } from '../query.model';
import { QueryState, QUERY_STORE_KEY } from './query.state';

export const queryState = createFeatureSelector<QueryState>(QUERY_STORE_KEY);

export const isInProgress = (groupName: string) => createSelector(
  queryState,
  (state: QueryState) => state.groups[groupName] ? state.groups[groupName].isInProgress : null,
);

const getQuery = (state: QueryState, name: string): QueryResponse<any> => state.queries[name] || null;

export const query = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => getQuery(state, queryName)
);

export const response = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery(state, queryName);
    return query ? query.response : null;
  }
);

export const error = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery(state, queryName);
    return query ? query.error : null;
  }
);

export const status = (queryName: string) => createSelector(
  queryState,
  (state: QueryState) => {
    const query = getQuery(state, queryName);
    return query ? query.status : null;
  }
);
