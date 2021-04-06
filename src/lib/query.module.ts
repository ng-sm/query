import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { QueryReducer } from './store/query.reducer';
import { QUERY_STORE_KEY } from './store/query.state';
import { QueryFacade } from './store/query.facade';
import { QueryInterceptor } from './query.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(QUERY_STORE_KEY, QueryReducer),
  ],
  providers: [
    QueryFacade,
    { provide: HTTP_INTERCEPTORS, useClass: QueryInterceptor, multi: true },
  ]
})
export class QueryModule {}
