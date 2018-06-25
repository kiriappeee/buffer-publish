import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@bufferapp/components';

const TwoFactorToggle = ({ machineState, enabled, onClick }) => {
  const toggleEnabledStates = ['enabled', 'disabled'];
  const disabled = !toggleEnabledStates.includes(machineState);
  if (enabled) {
    return (
      <Button tertiary onClick={onClick} disabled={disabled}>
        Disable
      </Button>
    );
  }
  return (
    <Button tertiary onClick={onClick} disabled={disabled}>
      Enable
    </Button>
  );
};

TwoFactorToggle.propTypes = {
  machineState: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TwoFactorToggle;
