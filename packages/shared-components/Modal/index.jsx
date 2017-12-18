import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ onConfirmClick, onCancelClick, children }) => (
  <div>
    {children}
    <button onClick={onConfirmClick}>Confirm</button>
    <button onClick={onCancelClick}>Cancel</button>
  </div>
);

Modal.propTypes = {
  onConfirmClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
