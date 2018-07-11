import React from 'react';
import PropTypes from 'prop-types';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 0',
  alignItems: 'center',
};

const Row = ({ children }) => <section style={rowStyle}>{children}</section>;

Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Row;
