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
      const postId = state.sent.editingPostId;
      return ({
        userData: state.appSidebar.user,
        profiles: state.profileSidebar.profiles,
        enabledApplicationModes: state.enabledApplicationModes,
        environment: state.environment.environment,
        editMode: state.sent.editMode,
        post: state.sent.byProfileId[selectedProfileId].posts.find(p => p.id === postId),
      });
    }
    return {};
  },
)(ComposerWrapper);
