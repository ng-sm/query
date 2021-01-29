import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { QueryState } from './query.state';
import * as QuerySelectors from './query.selectors';
import { QueryResponse, QueryStatus } from '../query.model';

@Injectable()
export class QueryFacade {
  constructor(private store: Store<QueryState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  isInProgress$(groupName: string): Observable<boolean> {
    const selector = QuerySelectors.isInProgress(groupName);
    return this.store.pipe(select(selector));
  }

  query$<T>(queryName: string): Observable<QueryResponse<T>> {
    const selector = QuerySelectors.query(queryName);
    return this.store.pipe(select(selector));
  }

  response$<T>(queryName: string): Observable<T> {
    const selector = QuerySelectors.response(queryName);
    return this.store.pipe(select(selector));
  }

  error$(queryName: string): Observable<HttpErrorResponse> {
    const selector = QuerySelectors.error(queryName);
    return this.store.pipe(select(selector));
  }

  status$(queryName: string): Observable<QueryStatus> {
    const selector = QuerySelectors.status(queryName);
    return this.store.pipe(select(selector));
  }
}