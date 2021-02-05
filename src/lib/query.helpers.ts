import { QueryResponse, QueryConfig, QueryGroups, Queries } from './query.model';
import { QueryState } from './store/query.state';
import { isQueryGroupInProgress } from './query.utils';

export const getInitialQuery = (): QueryResponse<null> => ({
  status: null,
  response: null,
  error: null,
  isDirty: false,
  isInProgress: false,
  isSuccess: false,
  isError: false,
});

export const getQueriesGroup = (
  queryState: QueryState,
  queryConfig: QueryConfig,
  query: QueryResponse<any>,
  groupName: string,
): Queries[] => {
  const { groups } = queryState;
  const { name } = queryConfig;

  return {
    ...(groups[groupName] ? groups[groupName].queries : []),
    [name]: query,
  };
};

export const getQueryGroups = (
  queryState: QueryState,
  queryConfig: QueryConfig,
  query: QueryResponse<any>
): QueryGroups => {
  const { groups: stateGroups } = queryState;
  const { groups } = queryConfig;
  const extendedGroups = { ...stateGroups };

  if (!groups) {
    return extendedGroups;
  }

  groups.map(groupName => {
    const queries = getQueriesGroup(queryState, queryConfig, query, groupName);
    extendedGroups[groupName] = {
      isInProgress: isQueryGroupInProgress(queries),
      queries
    };
  });

  return extendedGroups;
};

export const getQueries = (
  queryState: QueryState,
  queryConfig: QueryConfig,
  query: QueryResponse<any>
): Queries => {
  return {
    ...queryState.queries,
    [queryConfig.name]: query
  };
};

export const parseQueryState = (
  queryState: QueryState,
  queryConfig: QueryConfig,
  query: QueryResponse<any>
): QueryState => {
  const groups = getQueryGroups(queryState, queryConfig, query);
  const queries = getQueries(queryState, queryConfig, query);

  return {
    ...queryState,
    queries,
    groups
  };
};
