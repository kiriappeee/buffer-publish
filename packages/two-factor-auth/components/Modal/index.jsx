import React from 'react';
import PropTypes from 'prop-types';

import { Text, Button, Link, Popover, Card, Input } from '@bufferapp/components';

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

export default TwoFactorModal;
