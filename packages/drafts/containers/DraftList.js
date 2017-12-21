import { connect } from 'react-redux';
import DraftList from '../components/DraftList';
import {
  openEditComposer,
  requestDraftApproval,
  handleDraftDeleteClick,
  handleDeleteCancel,
  requestDraftDelete,
  requestDraftNeedsApprovalUpdate,
  showDateTimeForm,
  updateUserReadMessages,
} from '../actions/';
import {
  parseDraftMaps,
  profileIsManager,
} from '../utils/draftParsing';

const mapStateToProps = (state) => {
  const { draftFilter, drafts, profile, user } = state;
  return {
    loading: drafts.loading,
    posts: parseDraftMaps({
      draftMap: drafts.drafts.draftMap,
      user: user.user,
      profile: profile.profile,
      view: draftFilter,
    }).filter((post) => {
      switch (draftFilter) {
        case 'drafts':
          return !post.needsApproval;
        case 'approval':
          return post.needsApproval;
        default:
          return true;
      }
    }).sort((a, b) => {
      if (a.scheduledAt && b.scheduledAt) {
        return a.scheduledAt - b.scheduledAt;
      } else if (a.scheduledAt) {
        return -1;
      } else if (b.scheduledAt) {
        return 1;
      } else if (a.sharedNext && b.sharedNext) {
        return a.createdAt - b.createdAt;
      } else if (a.sharedNext) {
        return -1;
      } else if (b.sharedNext) {
        return 1;
      }
      return a.createdAt - b.createdAt;
    }),
    manager: profileIsManager(profile.profile),
    profile: profile.profile,
    user: user.user,
    view: draftFilter
  };
};

const mapDispatchToProps = dispatch => ({
  onApproveClick: ({ post }) => dispatch(requestDraftApproval({ draft: post })),
  onCancelConfirmClick: ({ post }) =>
    dispatch(handleDeleteCancel({ draftId: post.id })),
  onDeleteClick: ({ post }) =>
    dispatch(handleDraftDeleteClick({ draft: post })),
  onDeleteConfirmClick: ({ post }) =>
    dispatch(requestDraftDelete({ draft: post })),
  onEditClick: ({ post }) =>
    dispatch(openEditComposer({
      draft: post,
      role: post.role,
      profileTimezone: post.profileTimezone,
    })),
  onMoveToDraftsClick: ({ post }) =>
    dispatch(requestDraftNeedsApprovalUpdate({
      draft: post,
      needsApproval: false,
      isMoving: true
    })),
  onRequestApprovalClick: ({ post }) =>
    dispatch(requestDraftNeedsApprovalUpdate({ draft: post, needsApproval: true })),
  onRescheduleClick: ({ post, target }) => {
    const { right, bottom } = target.getBoundingClientRect();
    const {
      right: parentRight,
      top: parentTop,
    } = document.getElementsByClassName('container main-container')[0].getBoundingClientRect();
    dispatch(showDateTimeForm({
      draftId: post.id,
      right: parentRight - right,
      top: bottom - parentTop,
    }));
  },
  onUserReadMessage: ({ message, userId }) =>
      dispatch(updateUserReadMessages({ message, userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DraftList);
