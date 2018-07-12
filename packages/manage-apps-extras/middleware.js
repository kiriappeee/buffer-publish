import { constants as tabsNames } from '@bufferapp/publish-preferences';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

import { actionTypes } from './reducer';


const isAppsAndExtrasTab = path => (path === `/preferences/${tabsNames.APPS_EXTRAS}`);

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case LOCATION_CHANGE:
      if (isAppsAndExtrasTab(action.payload.pathname)) {
        dispatch(dataFetchActions.fetch({
          name: 'connectedApps',
        }));
      }
      break;
    case actionTypes.REQUEST_REVOKE_APP:
      dispatch(dataFetchActions.fetch({
        name: 'revokeConnectedApp',
        args: { appId: action.appId },
      }));
      break;
    case `revokeConnectedApp_${dataFetchActions.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'We\'ve revoked the access of the app',
      }));
      break;
    default:
      break;
  }
};
