import React from 'react';
// import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
} from '@bufferapp/components';

const openExtensionLink = () => {
  window.open('https://buffer.com/extensions', '_blank');
};

const openLinkGooglePlay = () => {
  window.open('https://play.google.com/store/apps/details?id=org.buffer.android', '_blank');
};

const openLinkAppStore = () => {
  window.open('https://itunes.apple.com/app/apple-store/id490474324?pt=936146&ct=Web%20App%20Sidebar&mt=8', '_blank');
};

const AppsAndExtras = () => (
  <div
    style={{
      display: 'block',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: '1rem',
    }}
  >
    <div>
      <Text color={'outerSpace'} size={'mini'} weight={'bold'}>Buffer Apps & Extras</Text>
      <div>
        <Text size={'small'} color={'shuttleGray'}>
          Get the most out of Buffer with our mobile apps and browser extension
        </Text>
      </div>
    </div>
    <Divider />

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem 0',
      }}
    >
      <Text size={'mini'}>Browser Extension</Text>
      <Button onClick={openExtensionLink}>Install the browser extension</Button>
    </div>
    <Divider />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem 0',
      }}
    >
      <Text size={'mini'}>Mobile Apps</Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginRight: '0.5rem',
          }}
        >
          <Button tertiary onClick={openLinkAppStore}>View on Apple Store</Button>
        </div>
        <Button tertiary onClick={openLinkGooglePlay}>View on Google Play</Button>
      </div>
    </div>
    <Divider />
  </div>
);

// AppsAndExtras.propTypes = {
//   loggedIn: PropTypes.bool,
//   translations: PropTypes.shape({
//     loggedIn: PropTypes.string,
//     loggedOut: PropTypes.string,
//   }).isRequired,
// };

// AppsAndExtras.defaultProps = {
//   loggedIn: false,
// };

export default AppsAndExtras;
