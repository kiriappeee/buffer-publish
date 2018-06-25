import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';

const SetupApp = ({ transition }) => (
  <React.Fragment>
    <Text>Set up your authenticator app</Text>
    <div><Text>QR CODE HERE</Text></div>
    <div>
      <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
      <Button onClick={() => transition('NEXT')}>Next</Button>
    </div>
  </React.Fragment>
);

SetupApp.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default SetupApp;
