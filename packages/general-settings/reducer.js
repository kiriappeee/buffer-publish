
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL', {
  SET_DIRECT_POSTING: 0,
});

const initialState = {
  direct_posting_enabled: false,
  profileId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        direct_posting_enabled: action.profile.direct_posting_enabled,
        profileId: action.profile.id,
      };
    default:
      return state;
  }
};

export const actions = {
  handleSetUpDirectPostingClick: () => ({
    type: actionTypes.SET_DIRECT_POSTING,
  }),
};
