import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Link, Input } from '@bufferapp/components';

const ConfirmAppCode = ({ transition }) => (
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

ConfirmAppCode.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default ConfirmAppCode;
