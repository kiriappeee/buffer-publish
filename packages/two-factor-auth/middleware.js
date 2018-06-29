import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

// import { actions as notificationActions } from '@bufferapp/notifications';

import { actionTypes, actions } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SUBMIT_PHONE_NUMBER:
      dispatch(dataFetchActions.fetch({
        name: 'twoFactorUpdate',
        args: {
          tfaMethod: 'sms',
          tel: getState().twoFactorAuth.phoneNumber,
          edit: getState().twoFactorAuth.editMode,
        },
      }));
      break;
    case actionTypes.SETUP_APP:
      dispatch(dataFetchActions.fetch({
        name: 'twoFactorUpdate',
        args: {
          tfaMethod: 'app',
          tel: null,
          edit: getState().twoFactorAuth.editMode,
        },
      }));
      break;
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.args.tfaMethod === 'sms') {
        // We're on setupSMS, go the next page
        dispatch(actions.transition('NEXT'));
      }
      if (action.args.tfaMethod === 'app') {
        // We're on chooseMethod, show the QR code now
        dispatch(actions.transition('SETUP_APP'));
      }
      break;
    case actionTypes.SUBMIT_CODE:
      dispatch(dataFetchActions.fetch({
        name: 'twoFactorConfirm',
        args: {
          code: action.code,
          initKey: getState().twoFactorAuth.initKey,
          tfaMethod: getState().twoFactorAuth.updateMethod,
          tel: getState().twoFactorAuth.phoneNumber,
          edit: getState().twoFactorAuth.editMode,
        },
      }));
      break;
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.transition('CODE_ACCEPTED'));
      break;
    default:
      break;
  }
};
