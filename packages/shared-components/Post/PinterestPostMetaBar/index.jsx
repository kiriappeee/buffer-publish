import React from 'react';
import PropTypes from 'prop-types';
import PostMetaBar from '../../PostMetaBar';
import getFormattedSourceUrl from '../sourceUrl';

const PinterestPostMetaBar = ({
  dragging,
  sourceUrl,
  boardName,
  boardAvatarUrl,
}) => {
  const leftContent = { title: 'Pinned to:', text: boardName, avatarUrl: boardAvatarUrl };
  const rightContent = sourceUrl ? { title: 'Source:', text: getFormattedSourceUrl(sourceUrl) } : null;

  return (
    <PostMetaBar
      dragging={dragging}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

PinterestPostMetaBar.propTypes = {
  dragging: PropTypes.bool,
  sourceUrl: PropTypes.string,
  boardName: PropTypes.string,
  boardAvatarUrl: PropTypes.string,
};

export default PinterestPostMetaBar;
