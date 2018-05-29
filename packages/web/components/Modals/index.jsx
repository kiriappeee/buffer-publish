import React from 'react';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';

const Modals = ({ showUpgradeModal }) => (
  (showUpgradeModal && <UpgradeModal />)
);

export default Modals;
