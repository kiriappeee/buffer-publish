import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = {
  OPEN_COMPOSER: 'OPEN_COMPOSER',
  TOGGLE_DATE_TIME_FORM: 'TOGGLE_DATE_TIME_FORM',
  COLLABORATION_DRAFT_CREATED: 'COLLABORATION_DRAFT_CREATED',
  COLLABORATION_DRAFT_EDITED: 'COLLABORATION_DRAFT_EDITED',
  COLLABORATION_DRAFT_UPDATED: 'COLLABORATION_DRAFT_UPDATED',
  COLLABORATION_DRAFT_APPROVED: 'COLLABORATION_DRAFT_APPROVED',
  COLLABORATION_DRAFT_ERROR: 'COLLABORATION_DRAFT_ERROR',
  REQUESTING_DRAFT_DELETE: 'REQUESTING_DRAFT_DELETE',
  REQUESTING_DRAFT_APPROVE: 'REQUESTING_DRAFT_APPROVE',
  REQUESTING_NEEDS_APPROVAL_UPDATE: 'REQUESTING_NEEDS_APPROVAL_UPDATE',
  COLLABORATION_CONFIRM_DELETE: 'COLLABORATION_CONFIRM_DELETE',
  COLLABORATION_DRAFT_DELETED: 'COLLABORATION_DRAFT_DELETED',
  COLLABORATION_DELETE_CANCELED: 'COLLABORATION_DELETE_CANCELED',
  COLLABORATION_DRAFT_RESCHEDULE_START: 'COLLABORATION_DRAFT_RESCHEDULE_START',
  COLLABORATION_DRAFT_RESCHEDULE_SUCCESS: 'COLLABORATION_DRAFT_RESCHEDULE_SUCCESS',
  UPDATE_USER_READ_MESSAGES: 'UPDATE_USER_READ_MESSAGES',
  UPDATE_USER_READ_MESSAGES_SUCCESS: 'UPDATE_USER_READ_MESSAGES_SUCCESS',
  FETCH_PROFILE_DRAFTS_START: 'FETCH_PROFILE_DRAFTS_START',
  FETCH_PROFILE_DRAFTS_SUCCESS: 'FETCH_PROFILE_DRAFTS_SUCCESS',
  FETCH_PROFILE_DRAFTS_ERROR: 'FETCH_PROFILE_DRAFTS_ERROR',
  CHANGE_PROFILE: 'CHANGE_PROFILE',
  SET_DRAFT_FILTER: 'SET_DRAFT_FILTER',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
};

const initialState = {
  byProfileId: {},
  showComposer: false,
  enabledApplicationModes: [],
  environment: 'production',
  editMode: false,
  editingPostId: '',
};

const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  drafts: {},
  total: 0,
};

export const actions = {
  openEditComposer: ({ draft, role, profileTimezone }) => ({
    type: actionTypes.OPEN_COMPOSER,
    payload: true,
    draft,
    role,
    profileTimezone,
  }),
  draftEdited: ({ draft }) => ({
    type: actionTypes.COLLABORATION_DRAFT_EDITED,
    draftId: draft.id,
  }),
  draftUpdated: payload => ({
    type: actionTypes.COLLABORATION_DRAFT_UPDATED,
    draft: payload.draft,
    draftId: payload.draft_id,
  }),
  requestDraftApproval: ({ draft }) => ({
    type: actionTypes.REQUESTING_DRAFT_APPROVE,
    draftId: draft.id,
    draft,
  }),
  handleDraftDeleteClick: ({ draft }) => ({
    type: actionTypes.COLLABORATION_CONFIRM_DELETE,
    draftId: draft.id,
    draft,
  }),
  handleDeleteCancel: ({ draftId }) => ({
    type: actionTypes.COLLABORATION_DELETE_CANCELED,
    draftId,
  }),
  requestDraftDelete: ({ draft }) => ({
    type: actionTypes.REQUESTING_DRAFT_DELETE,
    draftId: draft.id,
    draft,
  }),
  requestDraftNeedsApprovalUpdate: ({ draft, needsApproval, isMoving }) => ({
    type: actionTypes.REQUESTING_NEEDS_APPROVAL_UPDATE,
    draftId: draft.id,
    draft,
    needsApproval,
    isMoving,
  }),
  draftDeleted: payload => ({
    type: actionTypes.COLLABORATION_DRAFT_DELETED,
    draftId: payload.update_id,
  }),
  draftCreated: payload => ({
    type: actionTypes.COLLABORATION_DRAFT_CREATED,
    draftId: payload.update.id,
    draft: payload.update,
  }),
  draftApproved: payload => ({
    type: actionTypes.COLLABORATION_DRAFT_APPROVED,
    draftId: payload.update.id,
    draft: payload.update,
  }),
  triggerDraftStatusUpdate: (/* { dispatch, draftId, isPendingApproval } */) => {
    // TODO: Version2. Hit update endpoint and toggles 'pending_approval' status.
    //       Dispatches draftUpdated action.
    // Once 'Pending Approval' tab is ready - filter drafts shown by 'pending_approval' field
  },
  draftActionError: error => ({
    type: actionTypes.COLLABORATION_DRAFT_ERROR,
    error,
  }),
  updateUserReadMessages: ({ message }) => ({
    type: actionTypes.UPDATE_USER_READ_MESSAGES,
    message,
  }),
  updateUserReadMessagesSuccess: ({ messages }) => ({
    type: actionTypes.UPDATE_USER_READ_MESSAGES_SUCCESS,
    messages,
  }),
  showDateTimeForm: ({ draftId, right, top }) => ({
    type: actionTypes.TOGGLE_DATE_TIME_FORM,
    draftId,
    payload: true,
    right,
    top,
  }),
  hideDateTimeForm: () => ({
    type: actionTypes.TOGGLE_DATE_TIME_FORM,
    payload: false,
  }),
  rescheduleStart: ({ draftId, date, time, timezone }) => ({
    type: actionTypes.COLLABORATION_DRAFT_RESCHEDULE_START,
    draftId,
    date,
    time,
    timezone,
  }),
  rescheduleSuccess: ({ draft }) => ({
    type: actionTypes.COLLABORATION_DRAFT_RESCHEDULE_SUCCESS,
    draft,
  }),
  fetchProfileDrafts: profileId => ({
    type: actionTypes.FETCH_PROFILE_DRAFTS_START,
    profileId,
  }),
  fetchProfileDraftsSuccess: drafts => ({
    type: actionTypes.FETCH_PROFILE_DRAFTS_SUCCESS,
    drafts,
  }),
  fetchProfileDraftsError: error => ({
    type: actionTypes.FETCH_PROFILE_DRAFTS_ERROR,
    error,
  }),
  changeProfile: profile => ({
    type: actionTypes.CHANGE_PROFILE,
    profile,
  }),
  setDraftFilter: ({ filter }) => ({
    type: actionTypes.SET_DRAFT_FILTER,
    filter,
  }),
  showNotification: ({ message, style }) => ({
    type: actionTypes.SHOW_NOTIFICATION,
    message,
    style,
  }),
};
