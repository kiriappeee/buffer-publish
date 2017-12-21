import { actionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/classic';
  }
  return 'https://buffer.com/classic';
};

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

