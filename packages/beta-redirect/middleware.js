import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/app';
  }
  return 'https://buffer.com/app';
};

export default ({ getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { hasPublishBeta } = getState().betaRedirect;
      if (!hasPublishBeta) {
        window.location = getClassicBufferURL();
      }
      break;
    }
    default:
      break;
  }
};
