import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';

const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
