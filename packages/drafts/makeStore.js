import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';

import { reducer as form } from 'redux-form';

import user from './reducers/user';
import drafts from './reducers/drafts';
import profile from './reducers/profile';
import settings, { initialState as initialSettings } from './reducers/settings';
import draftFilter from './reducers/draftFilter';
import bufferApiMiddleware from './middleware/bufferApiMiddleware';
import notificationMiddleware from './middleware/notificationMiddleware';
import tabCountMiddleware from './middleware/tabCountMiddleware';

export const makeReducer = () => combineReducers({
  drafts,
  draftFilter,
  user,
  profile,
  settings,
  form,
});

export const makeStore = (initialState) => {
  const reducer = makeReducer();
  const mergedInitialState = {
    ...initialState,
    settings: Object.assign(initialSettings, initialState.settings),
  };
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, mergedInitialState, composeEnhancers(
    applyMiddleware(
      notificationMiddleware,
      tabCountMiddleware,
      bufferApiMiddleware
    ))
  );

  return store;
};

export default makeStore;
