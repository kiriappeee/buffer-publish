import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/components';
import { AutoSelectText } from '@bufferapp/publish-shared-components';

const Recovery = ({
  transition,
  loading,
  editMode,
  recoveryCode,
  handleRecoveryCodeSelect,
}) => (
  <Fragment>
    <div style={{ textAlign: 'center' }}>
      <Text size="large">
        {editMode && 'Your Recovery Code'}
        {!editMode && 'Save this one-time recovery code'}
      </Text>
      <div style={{ margin: '12px 0 20px' }}>
        <Text size="mini">
          With Two Factor Authentication, if you lose your phone there&apos;s a possibility
          you could get locked out of your account. Save this code in a safe place to use if
          you can&apos;t log in with your phone.
        </Text>
      </div>
    </div>

    <AutoSelectText onSelect={handleRecoveryCodeSelect} copyToClipboard>
      {loading ? 'Please wait...' : recoveryCode}
    </AutoSelectText>

    <div style={{ textAlign: 'center', marginTop: '16px' }}>
      <Button onClick={() => transition('CLOSE')}>Done</Button>
    </div>
  </Fragment>
);

Recovery.propTypes = {
  transition: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleRecoveryCodeSelect: PropTypes.func.isRequired,
  recoveryCode: PropTypes.string.isRequired,
};

export default Recovery;
