import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import AppsManager from './index';

const connectedApps = [
  {
    id: 1,
    name: 'Buffer client 1',
  },
  {
    id: 2,
    name: 'Buffer client 2',
  }
]

storiesOf('AppsManager')
  .addDecorator(checkA11y)
  .add('without connected apps', () => (
    <AppsManager />
  ))
  .add('with connected apps', () => (
    <AppsManager
      connectedApps={connectedApps}
    />
  ));
