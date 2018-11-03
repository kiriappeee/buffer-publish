import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';
import keyWrapper from '@bufferapp/keywrapper';
import {
  header,
} from './components/SentPosts/postData';

export const actionTypes = keyWrapper('SENT', {
  OPEN_COMPOSER: 0,
  HIDE_COMPOSER: 0,
});

export const initialState = {
  byProfileId: {},
  showComposer: false,
  editMode: false,
  editingPostId: '',
  environment: 'production',
};

const profileInitialState = {
  header,
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: [],
  total: 0,
};

const handlePosts = (action, currentPosts) => {
  let posts = action.result.updates;
  if (action.args.isFetchingMore) {
    posts = [...currentPosts, ...posts];
  }
  return posts;
};

const increasePageCount = (page) => {
  page += 1;
  return page;
};

const determineIfMoreToLoad = (action, currentPosts) =>
  (action.result.total > (currentPosts.length + action.result.updates.length));

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case queueActionTypes.POST_SENT:
      return [action.post, ...state];
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
      return profileInitialState;
    case `sentPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `sentPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.posts),
        page: increasePageCount(state.page),
        posts: handlePosts(action, state.posts),
        total: action.result.total,
      };
    case `sentPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case queueActionTypes.POST_COUNT_UPDATED:
      return {
        ...state,
        total: action.counts.sent,
      };
    case queueActionTypes.POST_SENT:
      return {
        ...state,
        posts: postsReducer(state.posts, action),
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `sentPosts_${dataFetchActionTypes.FETCH_START}`:
    case `sentPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `sentPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case queueActionTypes.POST_SENT:
    case queueActionTypes.POST_COUNT_UPDATED:
      profileId = getProfileId(action);
      if (profileId) {
        return {
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
  handleShareAgainClick: ({ post, profileId }) => ({
    type: actionTypes.OPEN_COMPOSER,
    updateId: post.id,
    editMode: false,
    post,
    profileId,
  }),
  handleComposerCreateSuccess: () => ({
    type: actionTypes.HIDE_COMPOSER,
  }),
};
