import { actions as asyncDataFetchActions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  it('if user has publishBeta feature it should dispatch savePublishBetaRedirect', () => {
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

  it('if user doesn\'t have hasNewPublishNewFreeUser feature should redirect to classic Buffer', () => {
    const dispatch = jest.fn();
    const betaRedirect = {
      hasPublishBeta: false,
      hasPublishBetaRedirect: false,
      hasNewPublishNewFreeUser: true,
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
  });
});
