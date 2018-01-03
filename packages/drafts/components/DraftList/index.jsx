import React from 'react';
import PropTypes from 'prop-types';
// import CSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from '@bufferapp/components/Loader';
import {
  PostList,
  // EmptyState,
} from '@bufferapp/publish-shared-components';
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
  <PostList
    posts={posts}
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
  // <EmptyState
  //   title="It looks like you haven't got any drafts!"
  //   subtitle="Click the box above to add a draft :)"
  //   heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
  //   heroImgSize={{ width: '229px', height: '196px' }}
  // />;
  <Empty
    isManager={manager}
    profile={profile}
    user={user}
    handleUserReadMessage={onUserReadMessage}
    view={view}
  />;

const DraftList = ({
  loading,
  posts,
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
          posts,
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
  posts: PropTypes.arrayOf(
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
