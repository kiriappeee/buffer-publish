import React from 'react';
import PropTypes from 'prop-types';

import { Text, Link } from '@bufferapp/components';

const TwoFactorPreferencesRow = ({ machineState }) => {
  switch (machineState) {
    case 'enabled':
      return (
        <Text size={'mini'}>
          Enabled!
        </Text>
      );
    case 'disabled':
    default:
      return (
        <Text size={'mini'}>
          Two factor authentication adds an extra layer of security for your Buffer account.
          Whenever you log in to your account, after entering your username and password,
          you will be asked for a second authentication code that was sent to your mobile
          phone via text or a free mobile app. <Link href="#">Learn more</Link>
        </Text>
      );
  }
};

TwoFactorPreferencesRow.propTypes = {
  machineState: PropTypes.string.isRequired,
};

export default TwoFactorPreferencesRow;
