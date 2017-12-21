import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DraftList from './containers/DraftList';
import DateTimeForm from './containers/DateTimeForm';

const Root = props => (
  <Provider store={props.store}>
    <div className={'reset-css'}>
      <DraftList />
      <DateTimeForm />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
