import React from 'react';
import PropTypes from 'prop-types';

import { Text, Button, Link, Popover, Card, Input } from '@bufferapp/components';

const TwoFactorInlineContent = ({ machineState }) => {
  switch (machineState) {
    case 'enabled':
      return (
        <Text size={'mini'}>
          Enabled!
        </Text>
      );
    case 'disabled':
    default:
      return (
        <Text size={'mini'}>
          Two factor authentication adds an extra layer of security for your Buffer account.
          Whenever you log in to your account, after entering your username and password,
          you will be asked for a second authentication code that was sent to your mobile
          phone via text or a free mobile app. <Link href="#">Learn more</Link>
        </Text>
      );
  }
};

TwoFactorInlineContent.propTypes = {
  machineState: PropTypes.string.isRequired,
};

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

const ModalWrapper = ({ children, transition }) => (
  <Popover onOverlayClick={() => transition('CLOSE')}>
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
  transition: PropTypes.func.isRequired,
};

const TwoFactorModal = ({ machineState, transition }) => {
  switch (machineState) {
    case 'chooseMethod':
      return (
        <ModalWrapper transition={transition}>
          <Text>Choose your method!</Text>
          <div>
            <Button onClick={() => transition('CHOOSE_SMS')}>Text Message</Button>
            <Button onClick={() => transition('CHOOSE_APP')}>Authenticator App</Button>
          </div>
        </ModalWrapper>
      );
    case 'setupSMS':
      return (
        <ModalWrapper transition={transition}>
          <Text>Set up your phone number</Text>
          <div>
            <Link href="#" onClick={() => transition('PHONE_REJECTED')}>Simulate invalid phone</Link>
          </div>
          <Input type="text" />
          <div>
            <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
            <Button onClick={() => transition('PHONE_ACCEPTED')}>Next</Button>
          </div>
        </ModalWrapper>
      );
    case 'setupApp':
      return (
        <ModalWrapper transition={transition}>
          <Text>Set up your authenticator app</Text>
          <div><Text>QR CODE HERE</Text></div>
          <div>
            <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
            <Button onClick={() => transition('NEXT')}>Next</Button>
          </div>
        </ModalWrapper>
      );
    case 'confirmSMSCode':
      return (
        <ModalWrapper transition={transition}>
          <Text>Confirm Code</Text>
          <div>
            <Link href="#" onClick={() => transition('CODE_REJECTED')}>Simulate rejected code</Link>
          </div>
          <Input type="text" />
          <div>
            <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
            <Button onClick={() => transition('CODE_ACCEPTED')}>Next</Button>
          </div>
        </ModalWrapper>
      );
    case 'confirmAppCode':
      return (
        <ModalWrapper transition={transition}>
          <Text>Confirm Code</Text>
          <div>
            <Link href="#" onClick={() => transition('CODE_REJECTED')}>Simulate rejected code</Link>
          </div>
          <Input type="text" />
          <div>
            <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
            <Button onClick={() => transition('CODE_ACCEPTED')}>Next</Button>
          </div>
        </ModalWrapper>
      );
    case 'recovery':
      return (
        <ModalWrapper transition={transition}>
          <Text>Save this one-time recovery code</Text>
          <div><Text>pKaA-p6yx-gIa5-mM7k</Text></div>
          <div>
            <Button onClick={() => transition('CLOSE')}>Done</Button>
          </div>
        </ModalWrapper>
      );
    default:
      return null;
  }
};
TwoFactorModal.propTypes = {
  machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
};

const TwoFactorAuth = ({
  machineState,
  isEnabled,
  /* editMode,
  type,
  phoneAreaCode,
  phoneNumber,
  confirmationCode,
  recoveryCode, */
  transition,
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
        <TwoFactorInlineContent machineState={machineState} />
        <TwoFactorModal machineState={machineState} transition={transition} />
        <code style={{ display: 'block' }}>machineState: {machineState}</code>
      </div>
    </div>
    <TwoFactorToggle
      machineState={machineState}
      enabled={isEnabled}
      onClick={() => transition(isEnabled ? 'DISABLE' : 'ENABLE')}
    />
  </div>
);

TwoFactorAuth.propTypes = {
  machineState: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  /* editMode: PropTypes.bool.isRequired,
  type: PropTypes.type.isRequired,
  phoneAreaCode: PropTypes.phoneAreaCode.isRequired,
  phoneNumber: PropTypes.phoneNumber.isRequired,
  confirmationCode: PropTypes.confirmationCode.isRequired,
  recoveryCode: PropTypes.string.isRequired, */
  transition: PropTypes.func.isRequired,
};

export default TwoFactorAuth;
