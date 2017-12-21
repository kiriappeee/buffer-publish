import BufferAPI from '@bufferapp/buffer-js-api';
import {
  UPDATE_USER_READ_MESSAGES,
  REQUESTING_DRAFT_DELETE,
  REQUESTING_DRAFT_APPROVE,
  REQUESTING_NEEDS_APPROVAL_UPDATE,
  OPEN_COMPOSER,
  FETCH_PROFILE_DRAFTS_START,
  COLLABORATION_DRAFT_CREATED,
  FETCH_PROFILE_DRAFTS_SUCCESS,
  COLLABORATION_DRAFT_UPDATED,
  COLLABORATION_DRAFT_APPROVED,
  COLLABORATION_DRAFT_DELETED
 } from '../reducers/';
import {
  updateUserReadMessagesSuccess,
  draftApproved,
  draftDeleted,
  draftActionError,
  fetchProfileDraftsSuccess,
  fetchProfileDraftsError,
  draftUpdated,
  draftEdited,
  showNotification,
} from '../actions/';
import editDraftWithComposer from '../utils/editDraftWithComposer';

const middleware = store => next => (action) => {
  switch (action.type) {
    case FETCH_PROFILE_DRAFTS_START:
      BufferAPI.request(
        `profiles/${action.profileId}/updates/drafts.json`,
        {
          csrf_token: buffer.csrf,
          resolve: true,
          count: 120
        }
      )
        .then((response) => {
          store.dispatch(fetchProfileDraftsSuccess(response.updates));
        })
        .catch(err =>
          store.dispatch(fetchProfileDraftsError(err))
        );
      break;
    case UPDATE_USER_READ_MESSAGES:
      BufferAPI.request(
        'user/set_message_read.json',
        {
          csrf_token: buffer.csrf,
          message: action.message,
        }
      )
        .then(response =>
          store.dispatch(updateUserReadMessagesSuccess({
            messages: response.messages
          }))
        )
        .catch(err => console.log(err));
      break;
    case REQUESTING_DRAFT_DELETE:
      BufferAPI.request(
        `updates/${action.draft.id}/destroy.json`,
        {
          csrf_token: buffer.csrf,
        }
      )
        .then(response => store.dispatch(draftDeleted(response)))
        .catch(err => store.dispatch(draftActionError(err)));
      break;
    case REQUESTING_NEEDS_APPROVAL_UPDATE:
      BufferAPI.request(
        `drafts/${action.draftId}/needs_approval_update.json`,
        {
          csrf_token: buffer.csrf,
          needs_approval: action.needsApproval,
        }
      )
        .then(response => store.dispatch(draftUpdated(response)))
        .catch(err => store.dispatch(draftActionError(err)));
      break;
    case REQUESTING_DRAFT_APPROVE:
      BufferAPI.request(
        `updates/${action.draft.id}/approve.json`,
        {
          csrf_token: buffer.csrf
        }
      )
        .then(response => store.dispatch(draftApproved(response)))
        .catch(err => store.dispatch(draftActionError(err)));
      break;
    case OPEN_COMPOSER:
      editDraftWithComposer({ draft: action.draft, timezone: action.profileTimezone })
        .then(data => {
          var genericError = 'Looks like we ran into trouble sending this draft through. Up for giving it another go? If you still run into troubles, get in touch!';
          BufferAPI.post(
            `updates/${action.draft.id}/update.json`,
            {
              ...data,
              csrf_token: buffer.csrf,
            }
          )
            .then(response => {
              if (response.error) {
                store.dispatch(showNotification({
                  message: response.error === 'An unknown error occurred' ? genericError : response.error,
                  style: 'error'
                }));
              } else {
                store.dispatch(draftEdited({
                  draft: action.draft,
                }));
              }
            })
            .catch(err => {
              store.dispatch(showNotification({
                message: genericError,
                style: 'error'
              }));
            });
        });
      break;
    default:
      break;
  }
  return next(action);
};

export default middleware;
