import middleware from './middleware';
import { actionTypes, actions } from './reducer';
import { getConnectSocialAccountURL } from '@bufferapp/publish-utils';
import { mount } from 'enzyme';
import DefaultPage from './index';

// Object.defineProperty(window.location, 'href', {
//   writable: true,
//   value: 'https://publish.buffer.com'
// });

describe('middleware', () => {
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
  it('should ignore irrelevant actions', () => {
    const action = {
      type: 'foo'
    };
    const dispatch = jest.fn();
    const next = jest.fn();
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);

  });
  it('should go to connect social account url ', () => {
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT
    };
    const dispatch = jest.fn();
    const next = jest.fn();
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    // expect(window.location.href).toEqual('https://buffer.com/manage/own')

  });
});
