import { HttpErrorResponse } from '@angular/common/http';

export enum QueryStatus {
  Success = 'SUCCESS',
  InProgress = 'IN_PROGRESS',
  Failure = 'FAILURE',
}

export interface Query<T> {
  status?: QueryStatus;
  response?: T;
  error?: HttpErrorResponse;
}
