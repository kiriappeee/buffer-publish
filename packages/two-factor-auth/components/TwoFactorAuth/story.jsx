import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import TwoFactorAuth from './index';

const transitionAction = action('transition');

storiesOf('TwoFactorAuth')
  .addDecorator(checkA11y)
  .add('disabled', () => (
    <TwoFactorAuth
      machineState="disabled"
      isEnabled={false}
      transition={transitionAction}
    />
  ));
