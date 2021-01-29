import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { QueryConfig } from '../query.model';

export const QUERY_KEY = '[ngsm query]';

export const init = createAction(
  `${QUERY_KEY} INIT`,
  props<{ queryConfig: QueryConfig }>(),
);

export const inProgress = createAction(
  `${QUERY_KEY} IN_PROGRESS`,
  props<{ queryConfig: QueryConfig }>(),
);

export const success = createAction(
  `${QUERY_KEY} SUCCESS`,
  props<{ queryConfig: QueryConfig, response?: any }>(),
);

export const failure = createAction(
  `${QUERY_KEY} FAILURE`,
  props<{ queryConfig: QueryConfig, error: HttpErrorResponse }>(),
);

export const clear = createAction(
  `${QUERY_KEY} CLEAR`,
  props<{ queryConfig: QueryConfig }>(),
);
