import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ImagePost from './index';
import { Provider } from 'react-redux';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  productFeatures: {
    planName: 'free',
    features: {},
  }
});

const links = [{
  rawString: 'http://buff.ly/1LTbUqv',
  displayString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  indices: [74, 96],
}];
const multilineLinks = [{
  ...links[0],
  indices: [78, 100],
}];

const text = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';
const multilineText = 'What is a Product Designer? \n\nAn awesome story by @jgadapee over on Medium! \n\nhttp://buff.ly/1LTbUqv';

const postDetails = {
  isRetweet: false,
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsSent = {
  isRetweet: false,
  postAction: 'This post was sent at 9:21 (GMT)',
};

const isARetweetPostDetails = {
  ...postDetails,
  isRetweet: true,
};

const postDetailsError = {
  ...postDetails,
  postAction: 'This post will be sent at 9:21 (GMT)',
  error: 'Something went wrong. Try again?',
};

const retweetProfile = {
  name: 'Joel Gascoigne',
  handle: '@joelgascoigne',
  avatarUrl: 'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
};

const imageSrc = 'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg';
const squareImage = 'http://via.placeholder.com/400x400';
const tallImage = 'http://via.placeholder.com/400x900';
const wideImage = 'http://via.placeholder.com/900x400';

storiesOf('ImagePost', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('queued image post', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={links}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('queued image post with multi-line text', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={multilineLinks}
      postDetails={postDetails}
      text={multilineText}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('sent image post', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={links}
      postDetails={postDetailsSent}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('square image', () => (
    <ImagePost
      imageSrc={squareImage}
      links={links}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('tall image', () => (
    <ImagePost
      imageSrc={tallImage}
      links={links}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('wide image', () => (
    <ImagePost
      imageSrc={wideImage}
      links={links}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('retweet', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={links}
      postDetails={isARetweetPostDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('error', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={links}
      postDetails={postDetailsError}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ))
  .add('tag', () => (
    <ImagePost
      imageSrc={imageSrc}
      links={links}
      postDetails={postDetails}
      text={text}
      tag={'GIF'}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
    />
  ));
