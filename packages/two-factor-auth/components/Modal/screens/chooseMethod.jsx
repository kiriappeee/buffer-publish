import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';

const ChooseMethod = ({ transition }) => (
  <React.Fragment>
    <Text>Choose your method!</Text>
    <div>
      <Button onClick={() => transition('CHOOSE_SMS')}>Text Message</Button>
      <Button onClick={() => transition('CHOOSE_APP')}>Authenticator App</Button>
    </div>
  </React.Fragment>
);

ChooseMethod.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default ChooseMethod;
