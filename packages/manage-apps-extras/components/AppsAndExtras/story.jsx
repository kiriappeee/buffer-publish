import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import AppsAndExtras from './index';

const translations = {
  loggedIn: 'Logged In...',
  loggedOut: 'Logged Out...',
};

storiesOf('AppsAndExtras')
  .addDecorator(checkA11y)
  .add('should show texts', () => (
    <AppsAndExtras
      translations={translations}
      loggedIn
    />
  ))
  // .add('should show user is not logged in', () => (
  //   <LoggedIn
  //     translations={translations}
  //   />
  // ));
