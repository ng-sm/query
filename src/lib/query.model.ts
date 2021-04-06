import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface Queries {
  [key: string]: QueryResponse<HttpResponse<unknown>>;
}

export interface QueryGroup {
  queries: Queries[];
  isInProgress: boolean;
}

export interface QueryGroups {
  [key: string]: QueryGroup;
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
  response: T;
  error: HttpErrorResponse;
  status: QueryStatus;
  isSuccess: boolean;
  isError: boolean;
  isInProgress: boolean;
  isDirty: boolean;
}
