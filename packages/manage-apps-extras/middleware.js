import { constants as tabsNames } from '@bufferapp/publish-preferences';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

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
    default:
      break;
  }
};
