import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import {
  reducer as formReducer,
} from 'redux-form';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import PostingSchedule from './index';
import {
  settingsHeader,
  days,
  initialValues,
  profileTimezone,
  timezones,
} from './settingsData';


const history = createHistory();
const store = createStore(combineReducers({ form: formReducer }));

storiesOf('PostingSchedule', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('default', () => (
    <PostingSchedule
      postingScheduleHeader={settingsHeader}
      days={days}
      hasTwentyFourHourTimeFormat={false}
      initialValues={initialValues}
      items={timezones}
      profileTimezone={profileTimezone}
      onUpdateTime={action('on-update-time')}
    />
  ));
