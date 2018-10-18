import { getURL } from '../utils/index';
import { actionTypes } from './reducer';

export default () => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_DIRECT_POSTING:
      window.location = getURL.getInstagramDirectPostingURL(action.profileId);
      break;
    default:
      break;
  }
};
