import { createReducer, on, Action } from '@ngrx/store';
import { QueryStatus } from '../http-query.model';
import * as QueryActions from './http-query.actions';
import { initialState, HttpQueryState } from './http-query.state';
import { initialQuery, parseQueryState } from '../http-query.helpers';

export const httpQueryReducer = createReducer(
  initialState,
  on(QueryActions.init, (state, { config }) => parseQueryState({ state, config, query: {
    ...initialQuery,
    name: config.name
  }})),
  on(QueryActions.clear, (state, { config }) => parseQueryState({ state, config, query: {
    ...initialQuery,
    name: config.name
  }})),
  on(QueryActions.inProgress, (state, { config }) => parseQueryState({
    state,
    config,
    query: {
      ...state.queries[config.name],
      name: config.name,
      status: QueryStatus.InProgress,
      isDirty: true,
      isInProgress: true,
      isSuccess: false,
      isFailed: false,
    }
  })),
  on(QueryActions.success, (state, { config, response}) => parseQueryState({
    state,
    config,
    query: {
      status: QueryStatus.Success,
      name: config.name,
      response,
      error: null,
      isDirty: true,
      isInProgress: false,
      isSuccess: true,
      isFailed: false,
    }
  })),
  on(QueryActions.failure, (state, { config, error }) => parseQueryState({
    state,
    config,
    query: {
      status: QueryStatus.Failure,
      name: config.name,
      response: null,
      error,
      isDirty: true,
      isInProgress: false,
      isSuccess: false,
      isFailed: true,
    }
  })),
);

export function QueryReducer(state: HttpQueryState, action: Action) {
  return httpQueryReducer(state, action);
}
