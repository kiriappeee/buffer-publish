import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import TwoFactorAuth from './index';
import machine from '../../machine';

const transitionAction = action('transition');
const stories = storiesOf('TwoFactorAuth').addDecorator(checkA11y);

Object.keys(machine).forEach((machineState) => {
  stories.add(machineState, () => (
    <TwoFactorAuth
      machineState={machineState}
      isEnabled={machineState === 'enabled'}
      transition={transitionAction}
    />
  ));
});
