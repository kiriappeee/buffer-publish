import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import middleware from './middleware';

describe('middleware', () => {
  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
  it('should trigger a notification for COMPOSER_EVENT in case of success', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'saved-drafts',
      data: {
        message: 'message to receive',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: action.data.message,
    }));
  });
});