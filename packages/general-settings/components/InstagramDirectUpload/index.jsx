import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Divider,
  Text,
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


const InstagramDirectUpload = ({
  onSetUpDirectPostingClick,
}) => (
  <div>
    <div style={instagramDirectPostingStyle}>
      <div>
        <div style={textWrapperStyle}>
          <Text
            color={'black'}
          >
          Enable Direct Posting
        </Text>
        </div>
        <div style={textWrapperStyle}>
          <Text>
         Buffer can now post directly to Instagram, all you need to do is switch Instagram
         profile to a business profile. We've created a guide to walk you through the process.
        </Text>
        </div>
      </div>
      <div style={setUpDirectPostingStyle}>
        <Button
          onClick={() => { onSetUpDirectPostingClick(); }}
        >
        Set up direct posting
      </Button>
      </div>
    </div>
    <Divider />
  </div>
);

InstagramDirectUpload.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectUpload;
