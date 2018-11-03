import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import InstagramDirectPosting from './index';


storiesOf('InstagramDirectPosting', module)
  .addDecorator(checkA11y)
  .add('default', () => (
      <InstagramDirectPosting />
  ))
