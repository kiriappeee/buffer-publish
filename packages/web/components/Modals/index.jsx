import React from 'react';
import { connect } from 'react-redux';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';

const Modals = ({ showUpgradeModal }) => (
  (showUpgradeModal && <UpgradeModal />)
);

const mapStateToProps = state => ({
  showUpgradeModal: state.queue.showUpgradeModal,
});

export default connect(mapStateToProps)(Modals);
