import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  WarningIcon,
} from '@bufferapp/components';
import {
  borderWidth,
} from '@bufferapp/components/style/border';
import {
  mystic,
} from '@bufferapp/components/style/color';

import PostFooterButtons from '../PostFooterButtons';

const getPostDetailsStyle = dragging => ({
  display: 'flex',
  padding: '0.5rem 1rem',
  backgroundColor: '#fcfcfc',
  borderTop: `${borderWidth} solid ${mystic}`,
  opacity: dragging ? 0 : 1,
});

const postActionDetailsStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
};

const postActionDetailsIconStyle = {
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
};

const postControlsStyle = {
  display: 'flex',
};

/* eslint-disable react/prop-types */

const renderIcon = () =>
  (<div style={postActionDetailsIconStyle}>
    <WarningIcon color={'torchRed'} />
  </div>);

const renderText = ({ postDetails }, hasError) =>
  (<span>
    <Text
      size={'small'}
      color={hasError ? 'torchRed' : 'black'}
    >
      {hasError ? postDetails.error : postDetails.postAction}
    </Text>
  </span>);

/* eslint-enable react/prop-types */

const PostFooter = ({
  isDeleting,
  isConfirmingDelete,
  isWorking,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onRequeueClick,
  onEditClick,
  onShareNowClick,
  postDetails,
  sent,
  dragging,
}) => {
  const hasError = postDetails.error && postDetails.error.length > 0;
  return (<div style={getPostDetailsStyle(dragging)}>
    <div style={postActionDetailsStyle}>
      {hasError && renderIcon()}
      {renderText({ postDetails }, hasError)}
    </div>
    { !sent && (
      <div style={postControlsStyle}>
        <PostFooterButtons
          error={postDetails.error}
          isDeleting={isDeleting}
          isConfirmingDelete={isConfirmingDelete}
          isWorking={isWorking}
          onCancelConfirmClick={onCancelConfirmClick}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          onDeleteConfirmClick={onDeleteConfirmClick}
          onShareNowClick={onShareNowClick}
          onRequeueClick={onRequeueClick}
        />
      </div>)
    }
  </div>);
};

PostFooter.propTypes = {
  isDeleting: PropTypes.bool,
  isConfirmingDelete: PropTypes.bool,
  isWorking: PropTypes.bool,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  postDetails: PropTypes.shape({
    error: PropTypes.string,
    postAction: PropTypes.string,
  }).isRequired,
  sent: PropTypes.bool.isRequired,
  dragging: PropTypes.bool,
  onRequeueClick: PropTypes.func,
};

PostFooter.defaultProps = {
  isDeleting: false,
  isConfirmingDelete: false,
  isWorking: false,
  dragging: false,
};

export default PostFooter;
