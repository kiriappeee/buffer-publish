import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
// import { actions as notificationActions } from '@bufferapp/notifications';
// import { actionTypes, actions } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'draftPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
      break;
    default:
      break;
  }
};
