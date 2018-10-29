import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import InstagramDirectPostingBanner from './index';


storiesOf('InstagramDirectPostingBanner', module)
  .addDecorator(checkA11y)
  .add('default', () => (
      <InstagramDirectPostingBanner />
  ))
