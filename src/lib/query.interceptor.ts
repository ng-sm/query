import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryConfig } from './query.model';
import { QueryFacade } from './store/query.facade';
import * as QueryActions from './store/query.actions';

@Injectable()
export class QueryInterceptor implements HttpInterceptor {
  private queryNameKey = 'queryName';
  private queryGroupsKey = 'queryGroups';

  constructor(private queryFacade: QueryFacade) {}

  getConfig(request: HttpRequest<unknown>): QueryConfig {
    return {
      name: request.headers.get(this.queryNameKey),
      groups: request.headers.getAll(this.queryGroupsKey)
    };
  }

  parseRequest(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    return !request.headers.has(this.queryNameKey)
      ? request
      : request.clone({
        headers: request.headers
          .delete(this.queryNameKey)
          .delete(this.queryGroupsKey)
      })
  }

  handleSuccess(response: HttpEvent<unknown>, queryConfig: QueryConfig): void {
    if (response instanceof HttpResponse) {
      this.queryFacade.dispatch(QueryActions.success({ queryConfig, response }));
    }
  }

  handleError(error: HttpErrorResponse, queryConfig: QueryConfig): Observable<never> {
    this.queryFacade.dispatch(QueryActions.failure({ queryConfig, error }));
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const queryConfig = this.getConfig(request);

    if (!queryConfig.name) {
      return next.handle(request);
    }

    this.queryFacade.dispatch(QueryActions.inProgress({ queryConfig }));

    return next
      .handle(this.parseRequest(request))
      .pipe(
        tap(response => this.handleSuccess(response, queryConfig)),
        catchError(error => this.handleError(error, queryConfig)),
      );
  }
}
