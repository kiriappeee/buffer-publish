import { getURL } from '@bufferapp/publish-utils';
import { actionTypes } from './reducer';

export default () => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_DIRECT_POSTING:
      window.location = getURL.getInstagramDirectPostingURL(action.profileId.profileId);
      break;
    default:
      break;
  }
};
