import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card, Text, Button } from '@bufferapp/components';

const Modal = ({ handleSubmit, submitting, onRequestCloseModal, appId, appName }) => (
  <Popover onOverlayClick={() => onRequestCloseModal()}>
    <div
      style={{
        width: '30rem',
        margin: '0 25px',
      }}
    >
      <Card doublePadding>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            <Text size={'large'} color={'outerSpace'}>
              Are you sure?
            </Text>
          </div>
          <div
            style={{
              margin: '0 2.5rem',
              textAlign: 'center',
            }}
          >
            <Text size={'small'} color={'shuttleGray'}>
              You{"'"}re about to revoke access to {appName}.
              This will prevent the app from working with your Buffer account.
              Are you sure you want to continue?
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button
              tertiary
              disabled={submitting}
              onClick={(e) => {
                e.preventDefault();
                onRequestCloseModal();
              }}
            >
              Cancel
            </Button>
            <div
              style={{
                margin: '0.5rem',
              }}
            />
            <Button onClick={handleSubmit} disabled={submitting}>
              Yes, revoke acess
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </Popover>
);

Modal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onRequestCloseModal: PropTypes.func.isRequired,
  appName: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
};

export default Modal;
