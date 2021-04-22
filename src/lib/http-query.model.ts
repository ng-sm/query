import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpQueryState } from './store';

export interface Queries {
  [key: string]: QueryResponse<HttpResponse<unknown>>;
}

export interface QueryGroups {
  [key: string]: QueryGroup;
}

export interface QueryGroup {
  queryNames: string[];
  isInProgress: boolean;
}

export interface QueryConfig {
  name: string;
  groups?: string[];
}

export enum QueryStatus {
  Success = 'SUCCESS',
  InProgress = 'IN_PROGRESS',
  Failure = 'FAILURE',
}

export interface QueryResponse<T> {
  name: string;
  response: T;
  error: HttpErrorResponse;
  status: QueryStatus;
  isSuccess: boolean;
  isFailed: boolean;
  isInProgress: boolean;
  isDirty: boolean;
}

export interface QueryData<T> {
  state: HttpQueryState;
  config: QueryConfig;
  query: QueryResponse<HttpResponse<T>>;
  groupName?: string;
}
