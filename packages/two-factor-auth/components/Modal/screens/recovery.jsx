import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';
import { AutoSelectText } from '@bufferapp/publish-shared-components';

const Recovery = ({ transition, recoveryCode, handleRecoveryCodeSelect }) => (
  <React.Fragment>
    <Text>Save this one-time recovery code</Text>
    <AutoSelectText onSelect={handleRecoveryCodeSelect} copyToClipboard>
      {recoveryCode}
    </AutoSelectText>
    <div>
      <Button onClick={() => transition('CLOSE')}>Done</Button>
    </div>
  </React.Fragment>
);

Recovery.propTypes = {
  transition: PropTypes.func.isRequired,
  handleRecoveryCodeSelect: PropTypes.func.isRequired,
  recoveryCode: PropTypes.string.isRequired,
};

export default Recovery;
