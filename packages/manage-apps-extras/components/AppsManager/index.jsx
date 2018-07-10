import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
  LinkifiedText,
} from '@bufferapp/components';
import Modal from '../Modal';

const stylesFlexRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkGetMoreApps = {
  rawString: 'https://buffer.com/extras',
  displayString: 'Get More Apps →',
  url: 'https://buffer.com/extras',
  indices: [86, 111],
};

const AppsManager = ({
  connectedApps,
  showModalAppId,
  showModalAppName,
  onRequestOpenModal,
  onRequestCloseModal,
  onConfirmRevokeApp,
  submitting,
}) => (
  <div
    style={{
      display: 'block',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: '1rem',
    }}
  >
    <div>
      <Text color={'outerSpace'} size={'mini'} weight={'bold'}>Connected Apps</Text>
      <div>
        <LinkifiedText
          size={'small'}
          color={'shuttleGray'}
          links={[linkGetMoreApps]}
          newTab
        >
          {'Get the most out of Buffer and share from your mobile, news reader, blog or anywhere! https://buffer.com/extras'}
        </LinkifiedText>
        <Divider />

        {connectedApps.map(app => (
          <div key={app.id}>
            <div
              style={{
                ...stylesFlexRow,
                margin: '1rem 0',
              }}
            >
              <Text size={'mini'}>{app.name}</Text>
              <Button
                tertiary
                onClick={() => onRequestOpenModal({ appId: app.id, appName: app.name })}
              >
                Revoke Access
              </Button>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
    {showModalAppId !== null &&
      <Modal
        appId={showModalAppId}
        appName={showModalAppName}
        onCancelClick={onRequestCloseModal}
        onConfirmClick={onConfirmRevokeApp}
        submitting={submitting}
      />
    }
  </div>
);

AppsManager.propTypes = {
  connectedApps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  showModalAppId: PropTypes.string,
  showModalAppName: PropTypes.string,
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onConfirmRevokeApp: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

AppsManager.defaultProps = {
  connectedApps: [],
  showModalAppId: null,
  showModalAppName: '',
  submitting: false,
};

export default AppsManager;
