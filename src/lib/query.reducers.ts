import { createReducer, on } from '@ngrx/store';

import * as QueryActions from './query.actions';
import { QueryStatus } from './query.model';

export const queryReducer = createReducer(
  {},
  on(QueryActions.init, (state, action) => ({
    ...state,
    [action.query]: {},
  })),
  on(QueryActions.inProgress, (state, action) => ({
    ...state,
    [action.query]: {
      status: QueryStatus.InProgress,
    },
  })),
  on(QueryActions.success, (state, action) => ({
    ...state,
    [action.query]: {
      status: QueryStatus.Success,
      response: action.response,
    },
  })),
  on(QueryActions.failure, (state, action) => ({
    ...state,
    [action.query]: {
      status: QueryStatus.Failure,
      error: action.error,
    },
  })),
  on(QueryActions.clear, (state, action) => ({
    ...state,
    [action.query]: {},
  })),
);
