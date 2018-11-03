import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
  Button,
} from '@bufferapp/components';
import FeatureLoader from '@bufferapp/product-features';
import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';
import PostDragWrapper from '../PostDragWrapper';

const reBufferWrapperStyle = {
  paddingLeft: '1rem',
  minWidth: '132px',
};

const postStyle = {
  display: 'flex',
  alignItems: 'baseline',
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
  isSent,
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
    isSent,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  return <PostComponent {...postWithEventHandlers} />;
};

/* eslint-enable react/prop-types */

const PostList = ({
  listHeader,
  posts,
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
  onShareAgainClick,
  isSent,
}) =>
  <div>
    <div style={listHeaderStyle}>
      <Text
        color={'black'}
      >
        {listHeader}
      </Text>
    </div>
    <List
      items={posts.map(post =>
        <div style={postStyle}>
          {
            renderPost({
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
              onShareAgainClick,
              isSent,
            })
          }
          <FeatureLoader
            supportedFeatures={'share_again'}
          >
            <div style={reBufferWrapperStyle}>
              <Button
                secondary
                onClick={() => { onShareAgainClick({ post }); }}
              >
                Share Again
              </Button>
            </div>
          </FeatureLoader>
        </div>,
      )}
    />
  </div>;

PostList.propTypes = {
  listHeader: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
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
  onShareAgainClick: PropTypes.func,
  isSent: PropTypes.bool,
};

PostList.defaultProps = {
  posts: [],
};

export default PostList;
