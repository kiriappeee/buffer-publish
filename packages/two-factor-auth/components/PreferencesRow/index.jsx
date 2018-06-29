import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Text, Link } from '@bufferapp/components';

const TwoFactorPreferencesRow = ({
  machineState,
  transition,
  method,
  phoneNumber,
}) => (
  <Fragment>
    <Text size="mini">
      Two factor authentication adds an extra layer of security for your Buffer account.
      Whenever you log in to your account, after entering your username and password,
      you will be asked for a second authentication code that was sent to your mobile
      phone via text or a free mobile app. <Link href="#">Learn more</Link>
    </Text>
    {machineState !== 'disabled' && <Fragment>
      <div style={{ margin: '16px 0 0 0' }}>
        <Text size="mini">
          Method: <b>{method}</b>{' '}
          <Link href="#" onClick={() => transition('CHANGE_METHOD')}>Edit</Link>
        </Text>
      </div>
      {method === 'sms' && <div style={{ margin: '8px 0 0 0' }}>
        <Text size="mini">
          Phone number: <b>{phoneNumber}</b>{' '}
          <Link href="#" onClick={() => transition('CHANGE_SMS')}>Edit</Link>
        </Text>
      </div>}
      <div style={{ margin: '8px 0 0 0' }}>
        <Text size="mini">
          Recovery code:
          <Link href="#" onClick={() => transition('SHOW_RECOVERY')}>View</Link>
        </Text>
      </div>
    </Fragment>}
  </Fragment>
);

TwoFactorPreferencesRow.propTypes = {
  machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default TwoFactorPreferencesRow;
