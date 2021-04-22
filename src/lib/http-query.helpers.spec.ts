import { QueryData, QueryGroups } from './http-query.model';
import { addQueryToGroup, addQueryToGroups, initialQuery } from './http-query.helpers';
import { of } from 'rxjs';
import { isQueryInProgress$ } from './http-query.utils';

describe('http-query.helpers', () => {

  describe('#addQueryToGroup', () => {
    it('should add query to single group', () => {
      // given
      const queryData: QueryData<unknown> = {
        groupName: 'group-name',
        query: initialQuery,
        config: {
          groups: ['group-name', 'group-name-2'],
          name: 'new-query'
        },
        state: {
          queries: { 'existed-query': initialQuery },
          groups: {
            'group-name': {
              isInProgress: true,
              queryNames: ['existed-query']
            }
          }
        }
      };

      // when
      const queryNames = addQueryToGroup(queryData);

      // then
      expect(queryNames).toEqual([
        'existed-query',
        'new-query',
      ]);
    });
  });

  describe('#addQueryToGroups', () => {
    it('should add query to all groups', () => {
      // given
      const queryData: QueryData<unknown> = {
        query: initialQuery,
        config: {
          groups: ['group-name', 'group-name-2'],
          name: 'new-query'
        },
        state: {
          queries: { 'existed-query': initialQuery },
          groups: {
            'group-name': {
              isInProgress: false,
              queryNames: ['existed-query']
            }
          }
        }
      };

      // when
      const queryGroups: QueryGroups = addQueryToGroups(queryData);

      // then
      expect(queryGroups).toEqual({
        'group-name-2': {
          isInProgress: false,
          queryNames: ['new-query']
        },
        'group-name': {
          isInProgress: false,
          queryNames: ['existed-query', 'new-query'],
        }
      });
    });
  });

  describe('#isQueryInProgress$', () => {
    it('should check if all queries are NOT "inProgress"', (done) => {
        isQueryInProgress$([
          of({ ...initialQuery, isInProgress: false }),
          of({ ...initialQuery, isInProgress: false }),
        ]).subscribe(value => {
        expect(value).toEqual(false);
        done();
      });
    });

    it('should check if any query is "inProgress"', (done) => {
      isQueryInProgress$([
        of({ ...initialQuery, isInProgress: true }),
        of({ ...initialQuery, isInProgress: false }),
      ]).subscribe(value => {
        expect(value).toEqual(true);
        done();
      });
    });
  });

});
