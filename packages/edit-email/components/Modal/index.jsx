import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card, Button, Input, Text } from '@bufferapp/components';

const Modal = ({ hideModal, updateEmail, saveEmail, email }) =>
  <Popover onOverlayClick={hideModal}>
    <div style={{ width: '30rem', margin: '0 25px' }}>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block' }}><Text size="large" color="outerSpace">Edit your email address</Text></span>
          <span style={{ display: 'block', margin: '.75rem 0 1rem 0' }}><Text>Your current email address is <Text bold>{email}</Text></Text></span>
        </div>
        <form style={{ padding: '0 2.5rem' }}>
          <Input type="email" placeholder="Enter your email address" input={{onChange: updateEmail}} />
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '1.5rem 0' }}>
            <Button tertiary large onClick={hideModal}>
              Cancel
            </Button>
            <Button large onClick={(e) => {
              e.preventDefault();
              saveEmail();
            }}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </Popover>;

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Modal;
