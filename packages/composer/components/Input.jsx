import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Input.css';

const Input = ({ className, ...restProps }) => (
  <input
    className={`${styles.input} ${className}`}
    {...restProps}
  />
);

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
