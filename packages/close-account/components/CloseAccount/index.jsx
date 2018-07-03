import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, CloseIcon } from '@bufferapp/components';
import Modal from '../Modal';

const CloseAccount = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
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
      <Text color={'outerSpace'}>Delete your Buffer account</Text>
      <div
        style={{
          marginTop: '0.5rem',
        }}
      >
        <Text size={'mini'}>If you delete your account, you will lose all your posts.</Text>
      </div>
    </div>
    <Button onClick={onRequestOpenModal} noStyle>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            marginRight: '0.5rem',
          }}
        >
          <Text>Delete Buffer Account</Text>
        </div>
        <div>
          <CloseIcon color={'torchRed'} />
        </div>
      </div>
    </Button>
    {showModal ? <Modal onRequestCloseModal={onRequestCloseModal} onSubmit={onSubmit} /> : null}
  </div>
);

CloseAccount.propTypes = {
  showModal: PropTypes.bool,
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CloseAccount.defaultProps = {
  showModal: false,
};

export default CloseAccount;
