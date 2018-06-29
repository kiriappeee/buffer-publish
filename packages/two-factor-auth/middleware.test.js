import { actions as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actions, initialState } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({ twoFactorAuth: initialState }),
  };

  it('ignores irrelevant actions', () => {
    middleware(store)(next)({ type: 'FOO' });
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('submits the phone number to the backend for sms setup', () => {
    middleware(store)(next)(actions.submitPhoneNumber());
    expect(store.dispatch).toHaveBeenCalledWith(asyncDataFetchActions.fetch({
      name: 'twoFactorUpdate',
      args: {
        tfaMethod: 'sms',
        tel: store.getState().twoFactorAuth.phoneNumber,
        edit: store.getState().twoFactorAuth.editMode,
      },
    }));
  });

  it('submits to backend for app setup', () => {
    middleware(store)(next)(actions.setupApp());
    expect(store.dispatch).toHaveBeenCalledWith(asyncDataFetchActions.fetch({
      name: 'twoFactorUpdate',
      args: {
        tfaMethod: 'app',
        tel: null,
        edit: store.getState().twoFactorAuth.editMode,
      },
    }));
  });

  it('handles successful sms setup response', () => {
    middleware(store)(next)(asyncDataFetchActions.fetchSuccess({
      name: 'twoFactorUpdate',
      args: {
        tfaMethod: 'sms',
      },
      result: {
        success: true,
        init_key: 'foobar',
      },
    }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.transition('NEXT'));
  });

  it('handles successful app setup response', () => {
    middleware(store)(next)(asyncDataFetchActions.fetchSuccess({
      name: 'twoFactorUpdate',
      args: {
        tfaMethod: 'app',
      },
      result: {
        success: true,
        init_key: 'foobar',
      },
    }));
    expect(store.dispatch).toHaveBeenCalledWith(actions.transition('SETUP_APP'));
  });

  it('submits confirmation code to backend', () => {
    middleware(store)(next)(actions.submitCode('1234'));
    expect(store.dispatch).toHaveBeenCalledWith(asyncDataFetchActions.fetch({
      name: 'twoFactorConfirm',
      args: {
        code: '1234',
        initKey: store.getState().twoFactorAuth.initKey,
        tfaMethod: store.getState().twoFactorAuth.updateMethod,
        tel: store.getState().twoFactorAuth.phoneNumber,
        edit: store.getState().twoFactorAuth.editMode,
      },
    }));
  });

  it('shows recovery screen when confirmation code is correct', () => {
    middleware(store)(next)(asyncDataFetchActions.fetchSuccess({
      name: 'twoFactorConfirm',
      args: {
        tfaMethod: 'app',
      },
      result: {
        success: true,
        recovery: 'foobar',
      },
    }));

    expect(store.dispatch).toHaveBeenCalledWith(actions.transition('CODE_ACCEPTED'));
  });

  it('shows a notification when the recovery code is selected', () => {
    middleware(store)(next)(actions.recoveryCodeSelected());
    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: notificationActionTypes.CREATE_NOTIFICATION,
      message: 'Recovery code is copied to your clipboard!',
      notificationType: 'success',
    }));
  });

  afterEach(() => jest.resetAllMocks());
});
