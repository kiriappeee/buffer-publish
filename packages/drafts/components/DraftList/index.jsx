import React from 'react';
import PropTypes from 'prop-types';
// import CSSTransitionGroup from 'react-addons-css-transition-group';
import { LoadingAnimation } from '@bufferapp/components';
import { QueueItems } from '@bufferapp/publish-shared-components';
import Empty from '../Empty';
import styles from './style.css';

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const renderPostList = ({
  postLists,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
}) => {
  return (
    <QueueItems
      items={postLists}
      onApproveClick={onApproveClick}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onMoveToDraftsClick={onMoveToDraftsClick}
      onRequestApprovalClick={onRequestApprovalClick}
      onRescheduleClick={onRescheduleClick}
      draggable={false}
      type={'drafts'}
    />
  );
};

const renderEmpty = ({
  manager,
  profile,
  user,
  onUserReadMessage,
  view
}) =>
  <Empty
    isManager={manager}
    profile={profile}
    user={user}
    handleUserReadMessage={onUserReadMessage}
    view={view}
  />;

const DraftList = ({
  total,
  loading,
  postLists,
  manager,
  profile,
  user,
  view,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  onUserReadMessage,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {
        postLists.length > 0 ?
        renderPostList({
          postLists,
          onApproveClick,
          onCancelConfirmClick,
          onDeleteClick,
          onDeleteConfirmClick,
          onEditClick,
          onMoveToDraftsClick,
          onRequestApprovalClick,
          onRescheduleClick,
        }) :
        renderEmpty({
          manager,
          profile,
          user,
          onUserReadMessage,
          view,
        })
      }
    </div>
  );
};


// TODO: these need some <3, they're not complete!
DraftList.propTypes = {
  loading: PropTypes.bool,
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  manager: PropTypes.bool,
  profile: PropTypes.shape({
    timezone: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  total: PropTypes.number,
  view: PropTypes.oneOf(['approval', 'drafts', null]),
  onApproveClick: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onMoveToDraftsClick: PropTypes.func.isRequired,
  onRequestApprovalClick: PropTypes.func.isRequired,
  onRescheduleClick: PropTypes.func.isRequired,
  onUserReadMessage: PropTypes.func.isRequired,
};

DraftList.defaultProps = {
  loading: true,
};

export default DraftList;
