import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link, Button } from '@bufferapp/components';
import QrCode from './_qr-code-hidden-surprise';

const SetupApp = ({ transition }) => (
  <React.Fragment>
    <div style={{ textAlign: 'center' }}>
      <Text size="large">Set up your authenticator app</Text>
      <div style={{ margin: '12px 0' }}>
        <Text size="mini" weight="medium">
          Scan the QR code below in your authenticator app and you&apos;re all set!{' '}
        </Text>
        <Text size="mini">
          (If you have not installed an authenticator app yet,{' '}
          <Link newTab href="https://faq.buffer.com/article/443-what-is-2-step-login">
            read here for more information.
          </Link>)
        </Text>
      </div>
    </div>

    <QrCode />

    <div style={{ textAlign: 'center', paddingTop: '8px' }}>
      <div style={{ display: 'inline', paddingRight: '20px' }}>
        <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
      </div>
      <Button onClick={() => transition('NEXT')}>Next</Button>
    </div>
  </React.Fragment>
);

SetupApp.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default SetupApp;
