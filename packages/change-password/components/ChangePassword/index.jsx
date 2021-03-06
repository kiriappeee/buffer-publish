import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import Modal from '../Modal';

const ChangePassword = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
  <Row>
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text color={'outerSpace'}>Password</Text>
      <div
        style={{
          marginTop: '0.5rem',
        }}
      >
        <Text size={'mini'}>
          Use your password to sign in to Buffer on the web and mobile apps. Make it nice and
          secure!
        </Text>
      </div>
    </div>
    <Button onClick={onRequestOpenModal} tertiary>
      Change Your Password
    </Button>
    {showModal ? <Modal onRequestCloseModal={onRequestCloseModal} onSubmit={onSubmit} /> : null}
  </Row>
);

ChangePassword.propTypes = {
  showModal: PropTypes.bool,
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  showModal: false,
};

export default ChangePassword;
