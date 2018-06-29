import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';

const ChooseMethod = ({ transition, setupApp, loading }) => (
  <React.Fragment>
    {loading && <Text size="large">Please wait...</Text>}
    <div style={{ display: loading ? 'none' : 'block' }}>
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
          <Button secondary fillContainer onClick={setupApp}>Authenticator App</Button>
        </div>
      </div>
    </div>
  </React.Fragment>
);

ChooseMethod.propTypes = {
  transition: PropTypes.func.isRequired,
  setupApp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChooseMethod;
