import { getConnectSocialAccountURL } from '@bufferapp/publish-utils';

import {
  actions,
  actionTypes,
} from './reducer';


export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getConnectSocialAccountURL();
      break;
    default:
      break;
  }
};
