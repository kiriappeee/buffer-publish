import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Divider,
  Text, Link,
} from '@bufferapp/components';

const instagramDirectPostingStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginBottom: '0.5rem',
};

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const setUpDirectPostingStyle = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};


const InstagramDirectPostingBanner = ({
  onSetUpDirectPostingClick,
}) => (
  <div>
    <div>
      <div>
        <Text>
          Buffer can now post directly to Instagram!
        </Text>
      </div>
    </div>
    <div>
      <Link
        onClick={() => { onSetUpDirectPostingClick(); }}
      >
        Set up Instagram direct scheduling.
      </Link>
    </div>
  </div>
);

InstagramDirectPostingBanner.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingBanner;
