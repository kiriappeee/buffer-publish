import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ScheduleTableHeader from './index';

const dayName = 'Monday';

storiesOf('ScheduleTableHeader')
  .addDecorator(checkA11y)
  .add('default', () => (
    <ScheduleTableHeader
      dayName={dayName}
      paused={false}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('paused', () => (
    <ScheduleTableHeader
      dayName={dayName}
      paused
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ));

