import React from 'react';
import PropTypes from 'prop-types';

const QrCode = ({ data }) => (
  <img
    alt="QR Code"
    src={`data:image/png;base64,${data}`}
    style={{
      imageRendering: 'pixelated',
      width: '200px',
      height: '200px',
    }}
  />
);

QrCode.propTypes = {
  data: PropTypes.string.isRequired,
};

export default QrCode;
