import { getURL } from '@bufferapp/publish-formatters';
import { actionTypes } from './reducer';

export default () => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getURL.getConnectSocialAccountURL();
      break;
    default:
      break;
  }
};
