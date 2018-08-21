import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

import reducer from './reducer';

describe('reducer', () => {
  describe('actions', () => {
    it('user_fetchSuccess triggers a FETCH_SUCCESS action', () => {
      const id = 1;
      const name = 'sendFeedback';
      const result = 'result';
      const args = {
        body: 'test',
      };
      expect(dataFetchActions.fetchSuccess({ name, args, id, result })).toEqual({
        type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
        name,
        args,
        id,
        result,
      });
    });

    it('sendFeedback_fetchStart triggers a FETCH_START action', () => {
      const id = 1;
      const name = 'sendFeedback';
      const args = {
        body: 'test',
      };
      expect(dataFetchActions.fetchStart({ name, args, id })).toEqual({
        type: `sendFeedback_${dataFetchActionTypes.FETCH_START}`,
        name,
        args,
        id,
      });
    });

    it('sendFeedback_fetchSuccess triggers a FETCH_SUCCESS action', () => {
      const id = 1;
      const name = 'sendFeedback';
      const result = 'result';
      const args = {
        body: 'test',
      };
      expect(dataFetchActions.fetchSuccess({ name, args, id, result })).toEqual({
        type: `sendFeedback_${dataFetchActionTypes.FETCH_SUCCESS}`,
        name,
        args,
        id,
        result,
      });
    });

    it('sendFeedback_fetchFail triggers a FETCH_FAIL action', () => {
      const id = 1;
      const name = 'sendFeedback';
      const error = 'error';
      const args = {
        body: 'test',
      };
      expect(dataFetchActions.fetchFail({ name, args, id, error })).toEqual({
        type: `sendFeedback_${dataFetchActionTypes.FETCH_FAIL}`,
        name,
        args,
        id,
        error,
      });
    });
  });
});
