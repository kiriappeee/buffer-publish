import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import InstagramDirectUpload from './index';


storiesOf('InstagramDirectUpload', module)
  .addDecorator(checkA11y)
  .add('default', () => (
      <InstagramDirectUpload />
  ))
