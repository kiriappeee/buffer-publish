import React from 'react';
import PropTypes from 'prop-types';
import PostMetaBar from '../../PostMetaBar';

const InstagramPostMetaBar = ({
  dragging,
  locationName,
}) => {
  const leftContent = { title: 'Location:', text: locationName };
  return (
    <PostMetaBar
      dragging={dragging}
      leftContent={leftContent}
    />
  );
};

InstagramPostMetaBar.propTypes = {
  locationName: PropTypes.string,
  dragging: PropTypes.bool,
};

export default InstagramPostMetaBar;
