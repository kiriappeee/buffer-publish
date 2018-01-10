import React from 'react';

import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';

const EnsurePublishBetaUser = ({ children, loading, hasPublishBeta }) => {
  if (loading || !hasPublishBeta) {
    return (
      <BufferLoading fullscreen />
    );
  }
  if (hasPublishBeta) {
    return children;
  }
};

EnsurePublishBetaUser.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  hasPublishBeta: PropTypes.bool.isRequired,
};

export default EnsurePublishBetaUser;
