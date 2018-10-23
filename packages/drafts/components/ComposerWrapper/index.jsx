// TO DO: MOVE THIS TO A SHARED PACKAGE TO BE USED BY DRAFTS AND QUEUE
import React from 'react';
import { connect } from 'react-redux';
import { bufferPublishComposer as Composer } from '@bufferapp/composer';

const ComposerWrapper = props => (
  <div>
    <Composer {...props} />
  </div>
);
ComposerWrapper.propTypes = Composer.propTypes;
ComposerWrapper.defaultProps = Composer.defaultProps;

export default connect(
  (state) => {
    if (state.appSidebar && state.profileSidebar) {
      const selectedProfileId = state.profileSidebar.selectedProfileId;
      const postId = state.drafts.editingPostId;
      return ({
        userData: state.appSidebar.user,
        profiles: state.profileSidebar.profiles,
        enabledApplicationModes: state.enabledApplicationModes,
        environment: state.environment.environment,
        editMode: state.drafts.editMode,
        post: state.drafts.byProfileId[selectedProfileId].drafts[postId],
        draftMode: state.drafts.draftMode,
      });
    }
    return {};
  },
  dispatch => ({
    onEvent: (type, data) => {
      dispatch({ type: 'COMPOSER_EVENT', eventType: type, data });
    },
  }),
)(ComposerWrapper);
