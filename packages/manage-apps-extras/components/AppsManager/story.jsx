import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import AppsManager from './index';

const connectedApps = [
  {
    id: 1,
    name: 'Buffer client 1',
  },
  {
    id: 2,
    name: 'Buffer client 2',
  },
];

storiesOf('AppsManager')
  .addDecorator(checkA11y)
  .add('without connected apps', () => (
    <AppsManager />
  ))
  .add('with connected apps', () => (
    <AppsManager
      connectedApps={connectedApps}
    />
  ))
  .add('show modal with name', () => (
    <AppsManager
      connectedApps={connectedApps}
      onRequestCloseModal={action('onRequestCloseModal')}
      onSubmit={action('onRequestCloseModal')}
      showModalAppId={'1'}
      showModalAppName={'App 1'}
    />
  ));
