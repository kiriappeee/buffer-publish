import { createElement } from 'react';
import { makeStore } from './makeStore';
import Root from './Root';

import PusherSubscriptionManager from './utils/pusherSubscriptionManager';

const App = (initialState) => {
  const store = makeStore(initialState);
  PusherSubscriptionManager.init(store);
  const collabTool = createElement(Root, { store });
  return { collabTool, store };
};

export default App;
