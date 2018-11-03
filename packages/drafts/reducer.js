import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DRAFTS', {
  DRAFT_CLICKED_DELETE: 0,
  DRAFT_CANCELED_DELETE: 0,
  DRAFT_CONFIRMED_DELETE: 0,
  OPEN_COMPOSER: 0,
  HIDE_COMPOSER: 0,
});

const initialState = {
  byProfileId: {},
  showComposer: false,
  enabledApplicationModes: [],
  environment: 'production',
  editMode: false,
  editingPostId: '',
  draftMode: true,
};

const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  drafts: {},
  total: 0,
};

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};

const getDraftUpdateId = (action) => {
  if (action.updateId) { return action.updateId; }
  if (action.args) { return action.args.updateId; }
  if (action.post) { return action.post.id; }
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.drafts).length;
  return (action.result.total > (currentPostCount + resultUpdatesCount));
};

const draftReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DRAFT_CONFIRMED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
        isDeleting: true,
      };
    case actionTypes.DRAFT_CLICKED_DELETE:
      return {
        ...state,
        isConfirmingDelete: true,
      };
    case actionTypes.DRAFT_CANCELED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
      };
    default:
      return state;
  }
};

const draftsReducer = (state = {}, action) => {
  switch (action.type) {
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { drafts } = action.result;
      if (action.args.isFetchingMore) {
        return { ...state, ...drafts };
      }
      return drafts;
    }
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_CANCELED_DELETE:
    case actionTypes.DRAFT_CLICKED_DELETE:
      return {
        ...state,
        [getDraftUpdateId(action)]: draftReducer(state[getDraftUpdateId(action)], action),
      };
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case `draftPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.drafts),
        page: state.page + 1,
        drafts: draftsReducer(state.drafts, action),
        total: action.result.total,
      };
    case `draftPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_CANCELED_DELETE:
    case actionTypes.DRAFT_CLICKED_DELETE:
      return {
        ...state,
        drafts: draftsReducer(state.drafts, action),
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `draftPosts_${dataFetchActionTypes.FETCH_START}`:
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `draftPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_CANCELED_DELETE:
    case actionTypes.DRAFT_CLICKED_DELETE:
      profileId = getProfileId(action);
      if (profileId) {
        return {
          ...state,
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
        };
      }
      return state;
    case actionTypes.OPEN_COMPOSER:
      return {
        ...state,
        showComposer: true,
        editMode: action.editMode,
        editingPostId: action.updateId,
      };
    case actionTypes.HIDE_COMPOSER:
      return {
        ...state,
        showComposer: false,
        editMode: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleEditClick: ({ draft, profileId }) => ({
    type: actionTypes.OPEN_COMPOSER,
    updateId: draft.id,
    editMode: true,
    draft,
    profileId,
  }),
  handleDeleteClick: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_CLICKED_DELETE,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleCancelConfirmClick: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_CANCELED_DELETE,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleDeleteConfirmClick: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_CONFIRMED_DELETE,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_COMPOSER,
  }),
  // TODO: rename to more representative name
  handleComposerCreateSuccess: () => ({
    type: actionTypes.HIDE_COMPOSER,
  }),
};
