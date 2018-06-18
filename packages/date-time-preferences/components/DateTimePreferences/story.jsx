import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import DateTimePreferences from './index';

storiesOf('DateTimePreferences')
  .addDecorator(checkA11y)
  .add('a story', () => (
    <DateTimePreferences />
  ))
  .add('time format can be 24 hour', () => (
    <DateTimePreferences twentyFourHourTime changeTwentyFourHourFormat={action('change twenty four hour format')} changeStartOfWeek={action('change day to start the week')} />
  ))
  .add('week can start on Monday', () => (
    <DateTimePreferences weekStartsMonday changeTwentyFourHourFormat={action('change twenty four hour format')} changeStartOfWeek={action('change day to start the week')} />
  ));
