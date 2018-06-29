import React from 'react';
import PropTypes from 'prop-types';

import { Text, Toggle } from '@bufferapp/components';

import Modal from '../Modal';
import PreferencesRow from '../PreferencesRow';

const TwoFactorAuth = ({
  machineState,
  isEnabled,
  phoneNumber,
  /* editMode,
  type,
  confirmationCode,
  recoveryCode, */
  transition,
  setPhoneNumber,
  submitPhoneNumber,
  loading,
  error,
  setupApp,
  qrCode,
  updateMethod,
  submitCode,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text color={'outerSpace'}>Two Factor Authentication</Text>
      <div
        style={{
          marginTop: '0.5rem',
          maxWidth: '700px',
        }}
      >
        <PreferencesRow
          machineState={machineState}
        />
        <Modal
          machineState={machineState}
          transition={transition}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          submitPhoneNumber={submitPhoneNumber}
          loading={loading}
          error={error}
          setupApp={setupApp}
          qrCode={qrCode}
          updateMethod={updateMethod}
          submitCode={submitCode}
        />
      </div>
    </div>
    <div
      style={{
        paddingRight: '0.5rem',
      }}
    >
      <Toggle
        on={isEnabled}
        onClick={() => transition(isEnabled ? 'DISABLE' : 'ENABLE')}
        disabled={!['enabled', 'disabled'].includes(machineState)}
      />
    </div>
  </div>
);

TwoFactorAuth.propTypes = {
  machineState: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  /* editMode: PropTypes.bool.isRequired,
  type: PropTypes.type.isRequired,
  confirmationCode: PropTypes.confirmationCode.isRequired,
  recoveryCode: PropTypes.string.isRequired, */
  transition: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  submitPhoneNumber: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  setupApp: PropTypes.func.isRequired,
  qrCode: PropTypes.string.isRequired,
  updateMethod: PropTypes.string.isRequired,
  submitCode: PropTypes.func.isRequired,
};

export default TwoFactorAuth;
