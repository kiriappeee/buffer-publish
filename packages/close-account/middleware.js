import { startSubmit, setSubmitSucceeded, stopSubmit } from 'redux-form';
import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { logoutUrl } from '@bufferapp/session-manager';
import formName from './symbols';
import { actions } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `closeAccount_${asyncDataFetchActionTypes.FETCH_START}`:
      dispatch(startSubmit(formName));
      break;
    case `closeAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(setSubmitSucceeded(formName));
      dispatch(actions.requestCloseModal());
      const {
        environment: { environment },
      } = getState();
      // redirect to logout url
      // this will clean up cookies and show the login screen
      window.location.replace(
        logoutUrl({
          production: environment === 'production',
        }),
      );
      break;
    }
    case `closeAccount_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        stopSubmit(formName, {
          _error: action.error,
        }),
      );
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error deleting your Buffer account',
        }),
      );
      break;
    default:
      break;
  }
};
