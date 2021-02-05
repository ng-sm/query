import { map, catchError } from 'rxjs/operators';
import { APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryConfig } from './query.model';
import * as QueryActions from './store/query.actions';

let _store;

export const BOOTSTRAP_QUERY_PROVIDER = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  deps: [Store],
  useFactory: (s) => {
    _store = s;
    return (store) => store;
  }
};

export const Query = (queryConfig: QueryConfig): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const original = descriptor.value;

  descriptor.value = function () {
    _store.dispatch(QueryActions.inProgress({ queryConfig }));

    return original.apply(this, arguments)
      .pipe(
        map((response) => {
          _store.dispatch(QueryActions.success({ queryConfig, response }));
          return response;
        }),
        catchError((error) => {
          _store.dispatch(QueryActions.failure({ queryConfig, error }));
          throw error;
        })
      );
  };

  return descriptor;
};
