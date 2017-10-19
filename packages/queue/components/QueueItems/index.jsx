import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from '@bufferapp/components';

import {
  TextPost,
  ImagePost,
  MultipleImagesPost,
  LinkPost,
  VideoPost,
  PostDragWrapper,
} from '@bufferapp/publish-shared-components';

const postStyle = {
  marginBottom: '2rem',
};

const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  marginLeft: '0.5rem',
};

const postTypeComponentMap = new Map([
  ['text', TextPost],
  ['image', ImagePost],
  ['multipleImage', MultipleImagesPost],
  ['link', LinkPost],
  ['video', VideoPost],
]);

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  draggable,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onDropPost,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  if (draggable) {
    return (
      <div style={postStyle} key={post.id}>
        <PostDragWrapper
          id={post.id}
          index={post.index}
          postComponent={PostComponent}
          postProps={postWithEventHandlers}
        />
      </div>
    );
  }

  return (
    <div style={postStyle} key={post.id}>
      <PostComponent {...postWithEventHandlers} />
    </div>
  );
};

const renderHeader = ({ text, id }) => (
  <div style={listHeaderStyle} key={id}>
    <Text color={'black'}>
      {text}
    </Text>
  </div>
);

/* eslint-enable react/prop-types */

const QueueItems = (props) => {
  const { items, ...propsForPosts } = props;
  const itemList = items.map((item) => {
    const { queueItemtype, ...rest } = item;
    if (queueItemtype === 'post') {
      return renderPost({ post: rest, ...propsForPosts });
    }
    if (queueItemtype === 'header') {
      return renderHeader(rest);
    }
    console.error(`Unknown queue item object (queueItemtype: '${queueItemtype}')`, rest);
    return null;
  });
  return (
    <div>
      {itemList}
    </div>
  );
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func,
  draggable: PropTypes.bool,
};

QueueItems.defaultProps = {
  items: [],
  draggable: false,
};

export default QueueItems;
