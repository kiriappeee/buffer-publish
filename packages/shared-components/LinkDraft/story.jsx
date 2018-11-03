import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import LinkDraft from './index';

const links = [{
  rawString: 'http://buff.ly/1LTbUqv',
  displayString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  indices: [74, 96],
}];

const text = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const linkAttachment = {
  title: 'What is a Product Designer?',
  description: 'A brief history at how history and markets influence design titles',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  thumbnailUrl: 'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
};

const draftDetails = {
  avatarUrl: 'https://buffer-uploads.s3.amazonaws.com/510521020a19000b6a00001e/a476fed03b1de4e06563d6063d7d3ee0.jpg',
  createdAt: 'on March 2nd at 12:45pm (GMT)',
  email: 'ash@buffer.com',
  isRetweet: false,
  postAction: 'This post will be added to the queue',
  userName: 'Ash',
  via: 'api',
};

const view = 'drafts';
const squareImage = 'http://lorempixel.com/400/400/cats/';
const tallImage = 'http://lorempixel.com/400/900/cats/';
const wideImage = 'http://lorempixel.com/900/400/cats/';

storiesOf('LinkDraft', module)
  .addDecorator(checkA11y)
  .add('queued link post', () => (
    <LinkDraft
      hasPermission
      links={links}
      linkAttachment={linkAttachment}
      draftDetails={draftDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      view={view}
    />
  ))
  .add('sent', () => (
    <LinkDraft
      hasPermission
      links={links}
      linkAttachment={linkAttachment}
      draftDetails={draftDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent
      view={view}
    />
  ))
  .add('square image', () => (
    <LinkDraft
      hasPermission
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: squareImage }}
      draftDetails={draftDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      view={view}
    />
  ))
  .add('tall image', () => (
    <LinkDraft
      hasPermission
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: tallImage }}
      draftDetails={draftDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      view={view}
    />
  ))
  .add('wide image', () => (
    <LinkDraft
      hasPermission
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: wideImage }}
      draftDetails={draftDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      view={view}
    />
  ));
