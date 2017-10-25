import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';
import { postParser } from '@bufferapp/publish-utils';

const PUSHER_APP_KEY = 'bd9ba9324ece3341976e';

const profileEventActionMap = {
  added_update: queueActionTypes.POST_CREATED,
  sent_update: queueActionTypes.POST_SENT,
  deleted_update: queueActionTypes.POST_DELETED,
  updated_update: queueActionTypes.POST_UPDATED,
};

const bindProfileEvents = (channel, profileId, dispatch) => {
  // Bind post related events
  Object.entries(profileEventActionMap).forEach(([pusherEvent, actionType]) => {
    channel.bind(pusherEvent, (data) => {
      dispatch({
        type: actionType,
        profileId,
        post: postParser(data.update),
      });
    });
  });
  // Bind other events
  channel.bind('reordered_updates', (order) => {
    dispatch({
      type: queueActionTypes.REORDERED_UPDATES,
      profileId,
      order,
    });
  });
};

export default ({ dispatch }) => {
  const pusher = new Pusher(PUSHER_APP_KEY, { authEndpoint: '/pusher/auth' }); // eslint-disable-line
  window.__pusher = pusher;
  const channelsByProfileId = {};

  return next => (action) => {
    next(action);
    if (action.type === profileSidebarActionTypes.SELECT_PROFILE) {
      const { profileId } = action;
      if (profileId) {
        if (!channelsByProfileId[profileId]) {
          const channelName = `private-updates-${profileId}`;
          channelsByProfileId[profileId] = pusher.subscribe(channelName);
          bindProfileEvents(channelsByProfileId[profileId], profileId, dispatch);
        }
      }
    }
  };
};
