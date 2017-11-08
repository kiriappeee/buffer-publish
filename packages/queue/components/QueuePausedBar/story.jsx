import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';

import QueuePausedBar from './index';

storiesOf('QueuePausedBar')
  .addDecorator(checkA11y)
  .add('default', () => (
    <QueuePausedBar handleClickUnpause={action('handleClickUnpause')} />
  ));
