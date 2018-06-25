import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link, Button, Input } from '@bufferapp/components';

const SetupSMS = ({ transition }) => (
  <React.Fragment>
    <Text>Set up your phone number</Text>
    <div>
      <Link href="#" onClick={() => transition('PHONE_REJECTED')}>Simulate invalid phone</Link>
    </div>
    <Input type="text" />
    <div>
      <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
      <Button onClick={() => transition('PHONE_ACCEPTED')}>Next</Button>
    </div>
  </React.Fragment>
);

SetupSMS.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default SetupSMS;
