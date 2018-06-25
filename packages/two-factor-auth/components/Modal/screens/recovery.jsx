import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';

const Recovery = ({ transition }) => (
  <React.Fragment>
    <Text>Save this one-time recovery code</Text>
    <div><Text>pKaA-p6yx-gIa5-mM7k</Text></div>
    <div>
      <Button onClick={() => transition('CLOSE')}>Done</Button>
    </div>
  </React.Fragment>
);

Recovery.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default Recovery;
