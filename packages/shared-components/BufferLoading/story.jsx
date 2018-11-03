import React from 'react';

import {
  storiesOf,
} from '@storybook/react';

import { checkA11y } from 'storybook-addon-a11y';

import BufferLoading from './index';

storiesOf('BufferLoading', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <BufferLoading />
  ));
