import React from 'react';
import PropTypes from 'prop-types';
import AppsManager from '../AppsManager';
import ExtrasLinks from '../ExtrasLinks';

const AppsAndExtras = ({
  connectedApps,
  onRequestOpenModal,
  showModalAppId,
  showModalAppName,
  onRequestCloseModal,
  onConfirmRevokeApp,
}) => (
  <div>
    <ExtrasLinks />
    <AppsManager
      connectedApps={connectedApps}
      onRequestOpenModal={onRequestOpenModal}
      onRequestCloseModal={onRequestCloseModal}
      showModalAppId={showModalAppId}
      showModalAppName={showModalAppName}
      onConfirmRevokeApp={onConfirmRevokeApp}
    />
  </div>
);

AppsAndExtras.propTypes = {
  connectedApps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onConfirmRevokeApp: PropTypes.func.isRequired,
  showModalAppId: PropTypes.string,
  showModalAppName: PropTypes.string,
};

AppsAndExtras.defaultProps = {
  connectedApps: [],
  showModalAppId: null,
  showModalAppName: '',
};

export default AppsAndExtras;
