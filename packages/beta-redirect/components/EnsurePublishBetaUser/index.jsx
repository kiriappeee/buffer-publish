import React from 'react';

import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';

const EnsurePublishBetaUser = ({ children, loading, hasPublishBeta, hasNewPublishNewFreeUser }) => {
  if (loading || (!hasPublishBeta && !hasNewPublishNewFreeUser)) {
    return (
      <BufferLoading fullscreen />
    );
  }
  if (hasPublishBeta || hasNewPublishNewFreeUser) {
    return children;
  }
};

EnsurePublishBetaUser.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  hasPublishBeta: PropTypes.bool.isRequired,
  hasNewPublishNewFreeUser: PropTypes.bool.isRequired,
};

export default EnsurePublishBetaUser;
