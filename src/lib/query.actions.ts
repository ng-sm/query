import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const QUERY_KEY = '[Query]';

export const init = createAction(
  `${QUERY_KEY} INIT`,
  props<{ query: string }>(),
);

export const inProgress = createAction(
  `${QUERY_KEY} IN_PROGRESS`,
  props<{ query: string }>(),
);

export const success = createAction(
  `${QUERY_KEY} SUCCESS`,
  props<{ query: string, response?: any }>(),
);

export const failure = createAction(
  `${QUERY_KEY} FAILURE`,
  props<{ query: string, error: HttpErrorResponse }>(),
);

export const clear = createAction(
  `${QUERY_KEY} CLEAR`,
  props<{ query: string }>(),
);
