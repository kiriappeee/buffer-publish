
import { actionTypes as profileActionTypes } from '../../profile-sidebar/index';
import { actionTypes as dataFetchActionTypes } from '../../async-data-fetch/index';
import cloneDeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL', {
  DIRECT_POSTING_SET: 0,
});

const initialState = {
  profileId: null,
  showClearAllModal: false,
  directPostingSet: false,
  profileName: '',
  profileType: '',
  profileService: '',
  avatar: '',
};

export default (state = initialState, action) => {
  let mergedSchedules = [];
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      mergedSchedules = mergeSchedules(action.profile.schedules, action.profile.pausedSchedules);
      return {
        ...state,
        loading: false,
        profileId: action.profile.id,
        profileName: action.profile.handle,
        profileType: action.profile.service_type,
        profileService: action.profile.service,
        avatar: action.profile.avatarUrl,
      };

    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const actions = {
  handleSetUpDirectPostingClick: profileId => ({
    type: actionTypes.DIRECT_POSTING_SET,
    profileId,
  }),
};
