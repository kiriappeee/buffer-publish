import React from 'react';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';

const AppModals = ({ showUpgradeModal }) => (
  (showUpgradeModal && <UpgradeModal />)
);

export default AppModals;
