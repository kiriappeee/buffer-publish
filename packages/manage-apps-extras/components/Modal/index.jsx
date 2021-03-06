import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card, Text, Button } from '@bufferapp/components';

const Modal = ({
  onConfirmClick,
  onCancelClick,
  submitting,
  appId,
  appName,
}) => (
  <Popover onOverlayClick={() => onCancelClick()}>
    <div style={{ width: '30rem', margin: '0 25px' }}>
      <Card doublePadding>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Text size={'large'} color={'outerSpace'}>Are you sure?</Text>
          </div>
          <div style={{ margin: '0 2.5rem', textAlign: 'center' }}>
            <Text size={'small'} color={'shuttleGray'}>
              You're about to revoke access to <b>{appName}</b>.
              This will prevent the app from working with your Buffer account.
              Are you sure you want to continue?
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button tertiary disabled={submitting} onClick={onCancelClick}>
              Cancel
            </Button>
            <div style={{ margin: '0.5rem' }} />
            <Button onClick={() => onConfirmClick({ appId })} disabled={submitting}>
              Yes, revoke access
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </Popover>
);

Modal.propTypes = {
  onConfirmClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  appId: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  submitting: false,
};

export default Modal;
