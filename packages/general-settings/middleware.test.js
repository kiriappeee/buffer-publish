import middleware from './middleware';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should run getLinkShortener when profile selected', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'test',
      },
    };
    const postAction = {
      name: 'getLinkShortener',
      args: {
        profileId: 'test',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch(postAction));
  });



});
