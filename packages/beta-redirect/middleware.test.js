import { actions as asyncDataFetchActions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  it('if has feature flips it redirects to classic Buffer', () => {
    const dispatch = jest.fn();
    const betaRedirect = {
      hasPublishBeta: true,
      hasPublishBetaRedirect: false,
      hasNewPublishNewFreeUser: false,
    };
    const store = {
      dispatch,
      getState: () => ({
        betaRedirect,
      }),
    };
    const action = {
      type: `user_${asyncDataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware(store)(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(store.dispatch)
      .toBeCalledWith(asyncDataFetchActions.fetch({
        name: 'savePublishBetaRedirect',
      }));
  });
});
