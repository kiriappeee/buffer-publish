import middleware from './middleware';
import { actionTypes, actions } from './reducer';
import DefaultPage from './index';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
  it('should ignore irrelevant actions', () => {
    const action = {
      type: 'foo'
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
  });
  it('should go to connect social account url ', () => {
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    // expect(global.location.href).toEqual('https://buffer.com/manage/own')
  });
});
