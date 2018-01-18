import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import QueueItems from './index';
import {
  postLists,
  postListsNoHeaders,
} from './postData';

storiesOf('QueueItems')
  .addDecorator(checkA11y)
  .add('default queue', () => (
    <QueueItems
      items={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onDropPost={action('onDropPost')}
      draggable={false}
    />
  ))
  .add('no headers type drafts', () => (
    <QueueItems
      items={postListsNoHeaders}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onDropPost={action('onDropPost')}
      draggable={false}
      type={'drafts'}
    />
  ));
