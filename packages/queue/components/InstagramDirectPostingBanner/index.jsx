import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Link, CircleInstagramIcon,
} from '@bufferapp/components';

const textWrapperStyle = {
  display: 'flex',
  marginLeft: '0.3rem',
};

const linkWrapperStyle = {
  marginLeft: '0.3rem',
};

const bannerWrapper = {
  border: '1px solid #CAD4DB',
  display: 'flex',
  position: 'relative',
  padding: '0.5rem',
  borderRadius: '0.2rem',
  backgroundColor: '#F1F7FB',
  alignItems: 'center',
};

const InstagramDirectPostingBanner = ({
  onSetUpDirectPostingClick,
}) => (
  <div style={bannerWrapper}>
    <CircleInstagramIcon color={'torchRed'} />
    <span
      style={textWrapperStyle}
    >
      <Text
        color={'black'}
        size={'small'}
      >
        Buffer can now post directly to Instagram!
        <span
          style={linkWrapperStyle}
        >
          <Link
            onClick={() => { onSetUpDirectPostingClick(); }}
          >
            Set up Instagram direct scheduling.
          </Link>
        </span>
      </Text>
    </span>
  </div>
);

InstagramDirectPostingBanner.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingBanner;
