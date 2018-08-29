import middleware from './middleware';
import { actionTypes, actions } from './reducer';
import { getConnectSocialAccountURL } from '@bufferapp/publish-utils';
import { mount } from 'enzyme';
import DefaultPage from './index';

describe('middleware', () => {
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should go to connect social account url ', () => {
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT
    };
    const dispatch = jest.fn();
    const next = jest.fn();
    middleware({ dispatch })(next)(action);
    expect(next)
    .toBeCalledWith(action);

  });
});
