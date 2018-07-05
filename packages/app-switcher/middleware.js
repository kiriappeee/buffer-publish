import { actionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { getClassicBufferURL } from '@bufferapp/publish-utils';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `sendFeedback_${actionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'Whoops, looks like we had some trouble sending your feedback, up for trying again?',
      }));
      break;
    case `sendFeedback_${actionTypes.FETCH_SUCCESS}`:
      setTimeout(() => {
        window.location = getClassicBufferURL();
      }, 1000);
      break;
    default:
      break;
  }
};

