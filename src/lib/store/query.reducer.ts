import { createReducer, on, Action } from '@ngrx/store';
import { QueryStatus } from '../query.model';

import * as QueryActions from './query.actions';
import { initialState, QueryState } from './query.state';
import { getInitialQuery, parseQueryState } from '../query.helpers';

export const queryReducer = createReducer(
  initialState,
  on(QueryActions.init, (state, { queryConfig }) => parseQueryState(state, queryConfig, getInitialQuery())),
  on(QueryActions.clear, (state, { queryConfig }) => parseQueryState(state, queryConfig, getInitialQuery())),
  on(QueryActions.inProgress, (state, { queryConfig }) => parseQueryState(state, queryConfig, {
    ...state.queries[queryConfig.name],
    status: QueryStatus.InProgress,
    isDirty: true,
    isInProgress: true,
    isSuccess: false,
    isError: false,
  })),
  on(QueryActions.success, (state, { queryConfig, response}) => parseQueryState(state, queryConfig, {
    status: QueryStatus.Success,
    response,
    error: null,
    isDirty: true,
    isInProgress: false,
    isSuccess: true,
    isError: false,
  })),
  on(QueryActions.failure, (state, { queryConfig, error }) => parseQueryState(state, queryConfig, {
    status: QueryStatus.Failure,
    response: null,
    error,
    isDirty: true,
    isInProgress: false,
    isSuccess: false,
    isError: true,
  })),
);

export function QueryReducer(state: QueryState, action: Action) {
  return queryReducer(state, action);
}
