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

const TwoFactorModal = ({ machineState, transition, phoneNumber, setPhoneNumber }) => {
  const ModalScreen = ModalScreens[machineState];
  if (ModalScreen) {
    return (
      <ModalWrapper handleClose={() => transition('CLOSE')}>
        <ModalScreen
          transition={transition}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
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
};

export default TwoFactorModal;
