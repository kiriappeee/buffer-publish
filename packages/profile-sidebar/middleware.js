import { push } from 'react-router-redux';
import { getManageSocialAccountURL } from '@bufferapp/publish-utils';

import {
  generateProfilePageRoute,
  getProfilePageParams,
  getPreferencePageParams,
} from '@bufferapp/publish-routes';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import {
  actions,
  actionTypes,
} from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      dispatch(dataFetchActions.fetch({
        name: 'profiles',
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const path = getState().router.location.pathname;
      const params = getProfilePageParams({
        path,
      });
      const isPreferencePage = !!getPreferencePageParams({
        path,
      });
      if (params && params.profileId) {
        dispatch(actions.selectProfile({
          profile: action.result.find(profile => profile.id === params.profileId),
        }));
      } else if (!isPreferencePage && action.result.length > 0) {
        const selectedProfile = action.result[0];
        dispatch(actions.selectProfile({
          profile: selectedProfile,
        }));
        dispatch(push(generateProfilePageRoute({
          profileId: selectedProfile.id,
          tabId: 'queue',
        })));
      }
      break;
    }
    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
      dispatch(dataFetchActions.fetch({
        name: 'pauseQueue',
        args: {
          profileId: action.profileId,
          paused: action.type === actionTypes.PROFILE_PAUSED,
        },
      }));
      break;
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getManageSocialAccountURL();
      break;
    case `pauseQueue_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: action.result.message,
      }));
      break;
    /**
     * When the buffer-web backend sends out it's paused state
     * message via Pusher let's reload the queue (only if it is now unpaused)
     */
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
      if (!action.paused) {
        dispatch(dataFetchActions.fetch({
          name: 'queuedPosts',
          args: {
            profileId: action.profileId,
            isFetchingMore: false,
          },
        }));
      }
      break;
    default:
      break;
  }
};
