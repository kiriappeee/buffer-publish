
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL', {
  SET_DIRECT_POSTING: 0,
});

const initialState = {
  directPostingEnabled: false,
  profileId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        directPostingEnabled: action.profile.directPostingEnabled,
        profileId: action.profileId,
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
};
