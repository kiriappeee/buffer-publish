
import { actionTypes as profileActionTypes } from '../profile-sidebar/index';
import { actionTypes as dataFetchActionTypes } from '../async-data-fetch/index';
import cloneDeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL', {
  SET_DIRECT_POSTING: 0,
  DIRECT_POSTING_ENABLED: 0,
});

const initialState = {
  profileId: null,
  profileDirectPostingEnabled: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.DIRECT_POSTING_ENABLED:
      return {
        ...state,
        direct_posting_enabled: action.profile.direct_posting_enabled,
      };
    default:
      return state;
  }
};

export const actions = {
  handleSetUpDirectPostingClick: profileId => ({
    type: actionTypes.SET_DIRECT_POSTING,
    profileId,
  }),
  showInstagramDirectPosting: () => ({
    type: actionTypes.DIRECT_POSTING_ENABLED,
  }),
};
