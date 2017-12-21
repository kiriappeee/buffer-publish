import {
  OPEN_COMPOSER,
  COLLABORATION_DRAFT_UPDATED,
  COLLABORATION_DRAFT_APPROVED,
  REQUESTING_DRAFT_DELETE,
  REQUESTING_DRAFT_APPROVE,
  REQUESTING_NEEDS_APPROVAL_UPDATE,
  COLLABORATION_CONFIRM_DELETE,
  COLLABORATION_DRAFT_DELETED,
  COLLABORATION_DELETE_CANCELED,
  COLLABORATION_DRAFT_ERROR,
  COLLABORATION_DRAFT_CREATED,
  COLLABORATION_DRAFT_EDITED,
  UPDATE_USER_READ_MESSAGES,
  UPDATE_USER_READ_MESSAGES_SUCCESS,
  TOGGLE_DATE_TIME_FORM,
  COLLABORATION_DRAFT_RESCHEDULE_START,
  COLLABORATION_DRAFT_RESCHEDULE_SUCCESS,
  FETCH_PROFILE_DRAFTS_START,
  FETCH_PROFILE_DRAFTS_SUCCESS,
  FETCH_PROFILE_DRAFTS_ERROR,
  CHANGE_PROFILE,
  SET_DRAFT_FILTER,
  SHOW_NOTIFICATION,
} from '../reducers/';

export const openEditComposer = ({ draft, role, profileTimezone }) => ({
  type: OPEN_COMPOSER,
  payload: true,
  draft,
  role,
  profileTimezone,
});

export const draftEdited = ({ draft }) => ({
  type: COLLABORATION_DRAFT_EDITED,
  draftId: draft.id,
});

export const draftUpdated = payload => ({
  type: COLLABORATION_DRAFT_UPDATED,
  draft: payload.draft,
  draftId: payload.draft_id,
});

export const requestDraftApproval = ({ draft }) => ({
  type: REQUESTING_DRAFT_APPROVE,
  draftId: draft.id,
  draft,
});

export const handleDraftDeleteClick = ({ draft }) => ({
  type: COLLABORATION_CONFIRM_DELETE,
  draftId: draft.id,
  draft,
});

export const handleDeleteCancel = ({ draftId }) => ({
  type: COLLABORATION_DELETE_CANCELED,
  draftId,
});

export const requestDraftDelete = ({ draft }) => ({
  type: REQUESTING_DRAFT_DELETE,
  draftId: draft.id,
  draft,
});

export const requestDraftNeedsApprovalUpdate = ({ draft, needsApproval, isMoving }) => ({
  type: REQUESTING_NEEDS_APPROVAL_UPDATE,
  draftId: draft.id,
  draft,
  needsApproval,
  isMoving,
});

export const draftDeleted = payload => ({
  type: COLLABORATION_DRAFT_DELETED,
  draftId: payload.update_id,
});

export const draftCreated = payload => ({
  type: COLLABORATION_DRAFT_CREATED,
  draftId: payload.update.id,
  draft: payload.update,
});

export const draftApproved = payload => ({
  type: COLLABORATION_DRAFT_APPROVED,
  draftId: payload.update.id,
  draft: payload.update,
});

export const triggerDraftStatusUpdate = (/* { dispatch, draftId, isPendingApproval } */) => {
  // TODO: Version2. Hit update endpoint and toggles 'pending_approval' status.
  //       Dispatches draftUpdated action.
  // Once 'Pending Approval' tab is ready - filter drafts shown by 'pending_approval' field
};

export const draftActionError = error => ({
  type: COLLABORATION_DRAFT_ERROR,
  error,
});

export const updateUserReadMessages = ({ message }) => ({
  type: UPDATE_USER_READ_MESSAGES,
  message,
});

export const updateUserReadMessagesSuccess = ({ messages }) => ({
  type: UPDATE_USER_READ_MESSAGES_SUCCESS,
  messages,
});

export const showDateTimeForm = ({ draftId, right, top }) => ({
  type: TOGGLE_DATE_TIME_FORM,
  draftId,
  payload: true,
  right,
  top,
});

export const hideDateTimeForm = () => ({
  type: TOGGLE_DATE_TIME_FORM,
  payload: false,
});

export const rescheduleStart = ({ draftId, date, time, timezone }) => ({
  type: COLLABORATION_DRAFT_RESCHEDULE_START,
  draftId,
  date,
  time,
  timezone,
});

export const rescheduleSuccess = ({ draft }) => ({
  type: COLLABORATION_DRAFT_RESCHEDULE_SUCCESS,
  draft,
});

export const fetchProfileDrafts = profileId => ({
  type: FETCH_PROFILE_DRAFTS_START,
  profileId,
});

export const fetchProfileDraftsSuccess = drafts => ({
  type: FETCH_PROFILE_DRAFTS_SUCCESS,
  drafts,
});

export const fetchProfileDraftsError = error => ({
  type: FETCH_PROFILE_DRAFTS_ERROR,
  error,
});

export const changeProfile = profile => ({
  type: CHANGE_PROFILE,
  profile,
});

export const setDraftFilter = ({ filter }) => ({
  type: SET_DRAFT_FILTER,
  filter,
});

export const showNotification = ({ message, style }) => ({
  type: SHOW_NOTIFICATION,
  message,
  style,
});
