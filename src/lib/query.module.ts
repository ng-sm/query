import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { QueryReducer } from './store/query.reducer';

import { QUERY_STORE_KEY } from './store/query.state';
import { QueryFacade } from './store/query.facade';
import { BOOTSTRAP_QUERY_PROVIDER } from './query.decorator';

@NgModule({
  imports: [
    StoreModule.forFeature(QUERY_STORE_KEY, QueryReducer),
  ],
  providers: [
    QueryFacade,
    BOOTSTRAP_QUERY_PROVIDER
  ]
})
export class QueryModule {}
