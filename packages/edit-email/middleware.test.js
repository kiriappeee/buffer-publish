import { actions as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actions } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const newEmail = 'hello@bufferapp.com';
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      editEmail: {
        newEmail,
      },
    }),
  };

  describe('update email address', () => {
    it('triggers an RPC call to editEmail', () => {
      middleware(store)(next)(actions.saveEmail());
      expect(store.dispatch)
        .toHaveBeenCalledWith(asyncDataFetchActions.fetch({
          name: 'updateEmail',
          args: {
            email: newEmail,
          },
        }));
    });

    it('triggers a notification on successful response', () => {
      middleware(store)(next)(asyncDataFetchActions.fetchSuccess({
        name: 'updateEmail',
        args: {
          email: newEmail,
        },
        result: {
          success: true,
        },
      }));
      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        message: 'Email edited successfully',
        notificationType: 'success',
      }));
    });

    it('triggers an error notification on error response', () => {
      middleware(store)(next)(asyncDataFetchActions.fetchFail({
        name: 'updateEmail',
        args: {
          email: newEmail,
        },
        error: 'This email belongs to another user!',
      }));
      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        message: 'This email belongs to another user!',
        notificationType: 'error',
      }));
    });
  });

  afterEach(() => jest.resetAllMocks());
});
