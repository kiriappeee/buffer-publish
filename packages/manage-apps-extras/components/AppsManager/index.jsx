import React from 'react';
// import PropTypes from 'prop-types';
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

const AppsManager = () => (
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
      </div>
    </div>
    <Divider />
  </div>
);

export default AppsManager;
