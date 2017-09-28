import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {
  SELECT_PROFILE: 'SELECT_PROFILE',
  POST_COUNT_UPDATED: 'POST_COUNT_UPDATED',
};

const initialState = {
  profiles: [],
  lockedProfiles: [],
  selectedProfileId: '',
  loading: false,
};

const profilesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      return state
        .map(profile => ({
          ...profile,
          open: profile.id === action.profileId,
        }));
    case actionTypes.POST_COUNT_UPDATED:
      return state
        .map(profile => ({
          ...profile,
          pendingCount: profile.id === action.profileId
            ? action.counts.pending
            : profile.pendingCount,
          sentCount: profile.id === action.profileId
            ? action.counts.sent
            : profile.sentCount,
        }));
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        loading: false,
        profiles: action.result
          .filter(profile => !profile.disabled),
        lockedProfiles: action.result
          .filter(profile => profile.disabled),
      };
    }
    case actionTypes.SELECT_PROFILE: {
      return {
        ...state,
        selectedProfileId: action.profileId,
        profiles: profilesReducer(state.profiles, action),
        lockedProfiles: profilesReducer(state.lockedProfiles, action),
      };
    }
    case actionTypes.POST_COUNT_UPDATED: {
      return {
        ...state,
        profiles: profilesReducer(state.profiles, action),
        lockedProfiles: profilesReducer(state.lockedProfiles, action),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  selectProfile: ({ profile }) => ({
    type: actionTypes.SELECT_PROFILE,
    profileId: profile.id,
    profile,
  }),
};
