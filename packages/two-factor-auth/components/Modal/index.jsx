import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card } from '@bufferapp/components';
import * as ModalScreens from './screens';

const ModalWrapper = ({ children, handleClose }) => (
  <Popover onOverlayClick={handleClose}>
    <div
      style={{
        width: '30rem',
      }}
    >
      <Card shadowHeight={2}>
        {children}
      </Card>
    </div>
  </Popover>
);

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const TwoFactorModal = ({ machineState, transition }) => {
  const ModalScreen = ModalScreens[machineState];
  if (ModalScreen) {
    return (
      <ModalWrapper handleClose={() => transition('CLOSE')}>
        <ModalScreen transition={transition} />
      </ModalWrapper>
    );
  }
  return null;
};
TwoFactorModal.propTypes = {
  machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
};

export default TwoFactorModal;
