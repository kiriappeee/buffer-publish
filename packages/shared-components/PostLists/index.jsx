import {
  List,
} from '@bufferapp/components';

import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../PostList';

/* eslint-disable react/prop-types */

const postListStyle = {
  marginBottom: '2.5rem',
};

const renderPostList = ({
  index,
  postList,
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
}) =>
  <div style={postListStyle}>
    <PostList
      key={`postList-${index}`}
      listHeader={postList.listHeader}
      posts={postList.posts}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      onImageClick={onImageClick}
      onImageClickNext={onImageClickNext}
      onImageClickPrev={onImageClickPrev}
      onImageClose={onImageClose}
      onDropPost={onDropPost}
      draggable={draggable}
    />
  </div>;

/* eslint-enable react/prop-types */

const PostLists = ({
  postLists,
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
}) =>
  <List
    items={postLists.map((postList, index) =>
      renderPostList({
        index,
        postList,
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
      }),
    )}
    fillContainer
  />;

PostLists.propTypes = {
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
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

PostLists.defaultProps = {
  postLists: [],
  draggable: false,
};

export default PostLists;
