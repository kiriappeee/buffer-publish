import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  hasPublishBeta: false,
  hasPublishBetaRedirect: false,
  hasNewPublishNewFreeUser: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { result: { features = [] } } = action;
      return {
        loading: false,
        hasPublishBeta: features.includes('new_publish_beta'),
        hasPublishBetaRedirect: features.includes('new_publish_beta_redirect'),
        hasNewPublishNewFreeUser: features.includes('new_publish_new_buffer_free_users'),
      };
    }
    default:
      return state;
  }
};

export const actions = {};
