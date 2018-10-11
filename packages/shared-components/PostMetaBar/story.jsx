import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostMetaBar from './index';

storiesOf('PostMetaBar', module)
  .addDecorator(checkA11y)
  .add('Pinterest bar with boards and sourceUrl', () => (
    <PostMetaBar
      leftContent={{ title: 'Pinned to:', text: 'Art' }}
      rightContent={{ title: 'SourceUrl', text: 'Google' }}
      dragging
    />
  ))
  .add('Pinterest bar with only boards', () => (
    <PostMetaBar
      leftContent={{ title: 'Pinned to:', text: 'Art' }}
      rightContent={{ title: 'SourceUrl', text: 'Google' }}
      dragging
    />
  ))
  .add('Instagram bar with location', () => (
    <PostMetaBar
      leftContent={{ title: 'Location:', text: 'New Zealand' }}
      dragging
    />
));
