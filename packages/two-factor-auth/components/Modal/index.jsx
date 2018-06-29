import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card } from '@bufferapp/components';
import * as ModalScreens from './screens';

const ModalWrapper = ({ children, handleClose }) => (
  <Popover onOverlayClick={handleClose}>
    <div
      style={{
        width: '500px',
      }}
    >
      <Card shadowHeight={2}>
        <div style={{ margin: '16px 40px' }}>
          {children}
        </div>
      </Card>
    </div>
  </Popover>
);

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const TwoFactorModal = ({
  machineState,
  transition,
  phoneNumber,
  setPhoneNumber,
  submitPhoneNumber,
  loading,
  error,
  setupApp,
  qrCode,
  updateMethod,
  submitCode,
}) => {
  const ModalScreen = ModalScreens[machineState];
  if (ModalScreen) {
    return (
      <ModalWrapper handleClose={() => transition('CLOSE')}>
        <ModalScreen
          transition={transition}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          submitPhoneNumber={submitPhoneNumber}
          loading={loading}
          error={error}
          setupApp={setupApp}
          qrCode={qrCode}
          updateMethod={updateMethod}
          submitCode={submitCode}
        />
      </ModalWrapper>
    );
  }
  return null;
};
TwoFactorModal.propTypes = {
  machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  submitPhoneNumber: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  setupApp: PropTypes.func.isRequired,
  qrCode: PropTypes.string.isRequired,
  updateMethod: PropTypes.string.isRequired,
  submitCode: PropTypes.func.isRequired,
};

export default TwoFactorModal;
