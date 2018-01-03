import React from 'react';
import PropTypes from 'prop-types';
// import CSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from '@bufferapp/components/Loader';
import { QueueItems } from '@bufferapp/publish-shared-components';
import Empty from '../Empty';
import styles from './style.css';

const renderPostList = ({
  posts,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
}) =>
  <QueueItems
    items={posts}
    onApproveClick={onApproveClick}
    onCancelConfirmClick={onCancelConfirmClick}
    onDeleteClick={onDeleteClick}
    onDeleteConfirmClick={onDeleteConfirmClick}
    onEditClick={onEditClick}
    onMoveToDraftsClick={onMoveToDraftsClick}
    onRequestApprovalClick={onRequestApprovalClick}
    onRescheduleClick={onRescheduleClick}
  />;

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
  loading,
  drafts,
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
      <Loader />
    );
  }
  return (
    <div className={styles.container}>
      {
        posts.length > 0 ?
        renderPostList({
          drafts,
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
  drafts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
  manager: PropTypes.bool,
  profile: PropTypes.shape({
    timezone: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
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

export default DraftList;
