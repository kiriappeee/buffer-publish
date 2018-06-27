import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

// import { actions as notificationActions } from '@bufferapp/notifications';

import { actionTypes, actions } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
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
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_SUCCESS}`:
      console.log('twoFactorUpdate success', action);
      dispatch(actions.transition('NEXT'));
      break;
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_FAIL}`:
      console.error('twoFactorUpdate fail', action);
      break;
    default:
      break;
  }

  return next(action);
};
