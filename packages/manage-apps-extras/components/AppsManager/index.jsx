import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
  Link,
} from '@bufferapp/components';

import { Row } from '@bufferapp/publish-shared-components';
import Modal from '../Modal';

const stylesFlexRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem 0',
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
  <Row>
    <div>
      <Text color={'outerSpace'} size={'mini'} weight={'bold'}>Connected Apps</Text>
      <div>
        <Text size={'small'} color={'shuttleGray'}>
          Get the most out of Buffer and share from your mobile, news reader, blog or anywhere! <Link newtab href={'https://buffer.com/extras'}>Get More Apps →</Link>
        </Text>
        <Divider />

        {connectedApps.map(app => (
          <div key={app.id}>
            <div style={stylesFlexRow}>
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
  </Row>
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
