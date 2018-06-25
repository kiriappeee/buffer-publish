import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link, Button, Input } from '@bufferapp/components';

const ConfirmSMSCode = ({ transition }) => (
  <React.Fragment>
    <Text>Confirm Code</Text>
    <div>
      <Link href="#" onClick={() => transition('CODE_REJECTED')}>Simulate rejected code</Link>
    </div>
    <Input type="text" />
    <div>
      <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
      <Button onClick={() => transition('CODE_ACCEPTED')}>Next</Button>
    </div>
  </React.Fragment>
);

ConfirmSMSCode.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default ConfirmSMSCode;
