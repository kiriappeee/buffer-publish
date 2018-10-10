import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostMetaBar from './index';

storiesOf('PostMetaBar', module)
  .addDecorator(checkA11y)
  .add('Instagram', () => (
    <PostMetaBar
      leftContent={{ title: 'Location:', text: 'Kathmandu, Nepal' }}
      dragging
    />
  ))
  .add('Pinterest without sourceUrl', () => (
    <PostMetaBar
      leftContent={{ title: 'Pinned to:', text: 'Art' }}
      dragging
    />
  ))
  .add('Pinterest with sourceUrl', () => (
    <PostMetaBar
      leftContent={{ title: 'Pinned to:', text: 'Art' }}
      rightContent={{ title: 'SourceUrl', text: 'Google' }}
      dragging
    />
  ));
