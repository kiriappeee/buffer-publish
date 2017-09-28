import {
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import middleware from './middleware';

describe('middleware', () => {
  it('should fetch user APP_INIT', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({ name: 'user' }));
  });
});
