import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
  LinkifiedText,
} from '@bufferapp/components';

const stylesFlexRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppsManager = ({ connectedApps }) => (
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
          links={[
            {
              rawString: 'https://buffer.com/extras',
              displayString: 'Get More Apps →',
              url: 'https://buffer.com/extras',
              indices: [86, 111],
            },
          ]}
          newTab
        >
          {'Get the most out of Buffer and share from your mobile, news reader, blog or anywhere! https://buffer.com/extras'}
        </LinkifiedText>
        <Divider />

        {connectedApps.map(app => (
          <div>
            <div
              style={{
                ...stylesFlexRow,
                margin: '1rem 0',
              }}
              key={app.id}
            >
              <Text size={'mini'}>{app.name}</Text>
              <Button tertiary>Revoke Access</Button>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  </div>
);

AppsManager.propTypes = {
  connectedApps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

AppsManager.defaultProps = {
  connectedApps: [],
};

export default AppsManager;
