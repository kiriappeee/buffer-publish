import { startSubmit, setSubmitSucceeded, stopSubmit } from 'redux-form';
import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import formName from './symbols';
import { actions } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `changePassword_${asyncDataFetchActionTypes.FETCH_START}`:
      dispatch(startSubmit(formName));
      break;
    case `changePassword_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(setSubmitSucceeded(formName));
      dispatch(actions.requestCloseModal());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Your password has been changed successfully',
      }));
      break;
    case `changePassword_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        stopSubmit(formName, {
          _error: action.error,
        }),
      );
      break;
    default:
      break;
  }
};
