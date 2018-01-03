import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { middleware as queueMiddleware } from '@bufferapp/publish-queue';
import { middleware as sentMiddleware } from '@bufferapp/publish-sent';
import { middleware as draftsMiddleware } from '@bufferapp/publish-drafts';
import { middleware as settingsMiddleware } from '@bufferapp/publish-settings';
import { middleware as profileSidebarMiddleware } from '@bufferapp/publish-profile-sidebar';
import { middleware as appSidebarMiddleware } from '@bufferapp/app-sidebar';
import { middleware as i18nMiddleware } from '@bufferapp/publish-i18n';
import { middleware as asyncDataFetchMiddleware } from '@bufferapp/async-data-fetch';
import { middleware as pusherSyncMiddleware } from '@bufferapp/publish-pusher-sync';
import { middleware as notificationsMiddleware } from '@bufferapp/notifications';
import { middleware as environmentMiddleware } from '@bufferapp/environment';
import { middleware as unauthorizedRedirectMiddleware } from '@bufferapp/unauthorized-redirect';
import { middleware as appSwitcherMiddleware } from '@bufferapp/publish-app-switcher';
import reducers from './reducers';

export const history = createHistory();

const configureStore = (initialstate) => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  return createStore(
    reducers,
    initialstate,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        asyncDataFetchMiddleware,
        i18nMiddleware,
        profileSidebarMiddleware,
        appSidebarMiddleware,
        queueMiddleware,
        draftsMiddleware,
        sentMiddleware,
        settingsMiddleware,
        pusherSyncMiddleware,
        notificationsMiddleware,
        environmentMiddleware,
        unauthorizedRedirectMiddleware,
        appSwitcherMiddleware,
      ),
    ),
  );
};

export default configureStore;
