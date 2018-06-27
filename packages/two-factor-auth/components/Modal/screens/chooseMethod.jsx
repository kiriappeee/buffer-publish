import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';

const ChooseMethod = ({ transition }) => (
  <React.Fragment>
    <div style={{ textAlign: 'center' }}>
      <Text size="large">Enable Two Factor Authentication</Text>
      <div style={{ margin: '12px 0' }}>
        <Text size="mini" weight="medium">How would you like us to send your security codes?</Text>
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '8px' }}>
        <Button secondary fillContainer onClick={() => transition('CHOOSE_SMS')}>Text Message</Button>
      </div>
      <div style={{ flex: 1, padding: '8px' }}>
        <Button secondary fillContainer onClick={() => transition('CHOOSE_APP')}>Authenticator App</Button>
      </div>
    </div>
  </React.Fragment>
);

ChooseMethod.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default ChooseMethod;
