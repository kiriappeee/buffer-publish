import {
  FETCH_PROFILE_DRAFTS_START,
  FETCH_PROFILE_DRAFTS_SUCCESS,
  FETCH_PROFILE_DRAFTS_ERROR,
  COLLABORATION_DRAFT_CREATED,
  COLLABORATION_DRAFT_UPDATED,
  COLLABORATION_DRAFT_APPROVED,
  COLLABORATION_CONFIRM_DELETE,
  COLLABORATION_DRAFT_DELETED,
  COLLABORATION_DELETE_CANCELED,
  COLLABORATION_DRAFT_ERROR,
  REQUESTING_DRAFT_APPROVE,
  REQUESTING_DRAFT_DELETE,
  REQUESTING_NEEDS_APPROVAL_UPDATE,
} from './index';

export function buildDraftsMap(drafts) {
  const draftMap = {};
  draftMap.draftMap = {};

  drafts.forEach((draft) => {
    draftMap.draftMap[draft._id] = draft;
    draftMap.draftMap[draft._id].isDeleting = false;
    draftMap.draftMap[draft._id].requestingDraftAction = false;
    draftMap.draftMap[draft._id].isMoving = false;
  });

  return draftMap;
}

const initialState = {
  drafts: { draftMap: {} },
  loading: true,
};

const draftReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUESTING_DRAFT_APPROVE:
      return { ...state, requestingDraftAction: true };
    case REQUESTING_DRAFT_DELETE:
      return { ...state, requestingDraftAction: true };
    case REQUESTING_NEEDS_APPROVAL_UPDATE:
      return { ...state, requestingDraftAction: true, isMoving: action.isMoving };
    case COLLABORATION_CONFIRM_DELETE:
      return { ...state, isDeleting: true };
    case COLLABORATION_DELETE_CANCELED:
      return { ...state, isDeleting: false };
    default:
      return state;
  }
};

const draftMapReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLABORATION_DRAFT_CREATED:
      return { ...state, [action.draftId]: action.draft };
    case COLLABORATION_DRAFT_UPDATED:
      return { ...state, [action.draftId]: action.draft };
    case REQUESTING_DRAFT_APPROVE:
      return {
        ...state,
        [action.draftId]: draftReducer(state[action.draftId], action),
      };
    case REQUESTING_DRAFT_DELETE:
      return {
        ...state,
        [action.draftId]: draftReducer(state[action.draftId], action),
      };
    case REQUESTING_NEEDS_APPROVAL_UPDATE:
      return {
        ...state,
        [action.draftId]: draftReducer(state[action.draftId], action),
      };
    case COLLABORATION_DRAFT_APPROVED:
      let { [action.draftId]: approved, ...newState } = state;
      return newState;
    case COLLABORATION_CONFIRM_DELETE:
      return {
        ...state,
        [action.draftId]: draftReducer(state[action.draftId], action),
      };
    case COLLABORATION_DELETE_CANCELED:
      return {
        ...state,
        [action.draftId]: draftReducer(state[action.draftId], action),
      };
    case COLLABORATION_DRAFT_DELETED:
      let { [action.draftId]: deleted, ...currentState } = state;
      return currentState;
    default:
      return state;
  }
};

const draftsReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLABORATION_DRAFT_CREATED:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case COLLABORATION_DRAFT_UPDATED:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case COLLABORATION_DRAFT_APPROVED:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case COLLABORATION_CONFIRM_DELETE:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case COLLABORATION_DELETE_CANCELED:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case COLLABORATION_DRAFT_DELETED:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case REQUESTING_DRAFT_APPROVE:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case REQUESTING_DRAFT_DELETE:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    case REQUESTING_NEEDS_APPROVAL_UPDATE:
      return { ...state, draftMap: draftMapReducer(state.draftMap, action) };
    default:
      return state;
  }
};

export default function reducer (state = initialState, action = { }) {
  switch (action.type) {
    case FETCH_PROFILE_DRAFTS_START:
      return { ...state, error: false, loading: true };
    case FETCH_PROFILE_DRAFTS_SUCCESS:
      const mappedDrafts = buildDraftsMap(action.drafts);
      return { ...state, drafts: mappedDrafts, error: false, loading: false };
    case FETCH_PROFILE_DRAFTS_ERROR:
      return { ...state, error: action.error, loading: false };
    case COLLABORATION_DRAFT_CREATED:
      if (action.draft.status !== 'draft') return state;
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_DRAFT_UPDATED:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_DRAFT_APPROVED:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_CONFIRM_DELETE:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_DELETE_CANCELED:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_DRAFT_DELETED:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case REQUESTING_DRAFT_APPROVE:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case REQUESTING_DRAFT_DELETE:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case REQUESTING_NEEDS_APPROVAL_UPDATE:
      return { ...state, drafts: draftsReducer(state.drafts, action) };
    case COLLABORATION_DRAFT_ERROR:
      // TODO: error message flash?
      return state;
    default:
      return state;
  }
}
