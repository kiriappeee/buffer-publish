import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {
  reducer as form,
} from 'redux-form';

import TimezoneInputForm from './index';

const settings = (state, _) => ({ profileTimezone: 'America/Vancouver' }); // eslint-disable-line
const store = createStore(combineReducers({ form, settings }));

const items = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

function sortStates(a, b, value) {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  const valueLower = value.toLowerCase();
  const queryPosA = aLower.indexOf(valueLower);
  const queryPosB = bLower.indexOf(valueLower);
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB;
  }
  return aLower < bLower ? -1 : 1;
}

storiesOf('TimezoneInputForm', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('default', () => (
    <TimezoneInputForm
      handleSubmit={action('on-submit-action')}
      items={items}
      onChange={action('on-change-action')}
      onSelect={action('select-action')}
      sortItems={sortStates}
    />
  ));
