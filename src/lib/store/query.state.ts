import { Queries, QueryGroups } from '../query.model';

export const QUERY_STORE_KEY = 'ngsmQuery';

export interface QueryState {
  queries: Queries,
  groups: QueryGroups,
}

export const initialState: QueryState = {
  queries: {},
  groups: {},
};
