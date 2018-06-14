import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Link,
} from '@bufferapp/components';

import Modal from '../Modal';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const editStyle = {
  marginLeft: '1rem',
};

const EditEmail = ({ email, onClick, displayModal, updateEmail, saveEmail, hideModal }) =>
  <div style={rowStyle}>
    <Text>Email address</Text>
    <section>
      <Text>{email}</Text>
      <span style={editStyle}><Text><Link onClick={onClick} unstyled href="#">Edit</Link></Text></span>
    </section>
    { displayModal && <Modal email={email} updateEmail={updateEmail} hideModal={hideModal} saveEmail={saveEmail} /> }
  </div>;

EditEmail.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  displayModal: PropTypes.bool,
};

EditEmail.defaultProps = {
  displayModal: false,
};

export default EditEmail;
