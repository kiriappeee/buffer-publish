import { getURL } from '@bufferapp/publish-utils';
import { actionTypes } from './reducer';

export default () => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.DIRECT_POSTING_SET:
      window.location = getURL.getInstagramDirectPostingURL();
      break;
    default:
      break;
  }
};
