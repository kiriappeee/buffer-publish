import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ExtrasLinks from './index';

storiesOf('ExtrasLinks')
  .addDecorator(checkA11y)
  .add('should show text and links', () => (
    <ExtrasLinks />
  ));
