import React from 'react';
import PropTypes from 'prop-types';

import {
  BufferTopIcon,
  BufferMiddleIcon,
  BufferBottomIcon,
} from '@bufferapp/components/Icon/Icons';

const loadingStyle = {
  width: '100%',
  height: '100%',
  background: 'white',
  zIndex: 12000,
  textAlign: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
};

const getIconContainerStyle = ({ size, fullscreen }) => ({
  display: 'inline-block',
  width: `${size}px`,
  height: `${size}px`,
  position: fullscreen ? 'absolute' : 'relative',
  top: fullscreen ? '50%' : 'auto',
  left: fullscreen ? '50%' : 'auto',
  margin: fullscreen ? `-${size / 2}px 0 0 -${size / 2}px` : 0,
});

const getIconPartStyle = delay => ({
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  animation: `2s ${delay} fade infinite`,
});

const BufferLoading = ({ fullscreen, size }) =>
  <div style={fullscreen ? loadingStyle : null}>
    <div style={getIconContainerStyle({ size, fullscreen })}>
      <div style={getIconPartStyle('0ms')}>
        <BufferTopIcon size={{ width: `${size}`, height: `${size}` }} />
      </div>
      <div style={getIconPartStyle('150ms')}>
        <BufferMiddleIcon size={{ width: `${size}`, height: `${size}` }} />
      </div>
      <div style={getIconPartStyle('300ms')}>
        <BufferBottomIcon size={{ width: `${size}`, height: `${size}` }} />
      </div>
    </div>
  </div>;

BufferLoading.propTypes = {
  fullscreen: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

BufferLoading.defaultProps = {
  fullscreen: false,
  size: 100,
};

export default BufferLoading;
