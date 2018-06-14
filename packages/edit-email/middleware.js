import { actions as dataFetchActions, actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions, actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => (action) => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case actionTypes.SAVE_EMAIL:
      dispatch(dataFetchActions.fetch({
        name: 'updateEmail',
        args: {
          email: getState().editEmail.newEmail,
        },
      }));
      break;
    case `updateEmail_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        message: 'Email edited successfully',
      }));
      dispatch(actions.hideModal());
      break;
    case `updateEmail_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    default:
      break;
  }

  return next(action);
};
