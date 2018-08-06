import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  action,
} from '@storybook/addon-actions';
import TabNavigation from './index';

storiesOf('TabNavigation', module)
  .add('default', () => (
    <TabNavigation
      selectedTabId={'queue'}
      onTabClick={action('tab-click')}
    />
  ));
