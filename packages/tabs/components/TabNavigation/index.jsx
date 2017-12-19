import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Link } from '@bufferapp/components';

const getClassicBufferPricingURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/pricing';
  }
  return 'https://buffer.com/pricing';
};

const TabNavigation = ({
  selectedTabId,
  onTabClick,
}) =>
  /* wrapper div with "tabs" id necessary as a selector
  for a11y focus after selecting profile in sidebar */
  <div id="tabs" style={{ paddingLeft: '0.5rem' }}>
    <Tabs
      selectedTabId={selectedTabId}
      onTabClick={onTabClick}
    >
      <Tab tabId={'queue'}>Queue</Tab>
      <Tab tabId={'sent'}>Sent Posts</Tab>
      <Tab tabId={'settings'}>Settings</Tab>
      <Link href={getClassicBufferPricingURL()} unstyled newTab>Upgrade</Link>
    </Tabs>
  </div>;

TabNavigation.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default TabNavigation;
