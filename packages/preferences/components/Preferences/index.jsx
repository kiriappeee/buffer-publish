import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Link, ArrowLeftIcon, Text } from '@bufferapp/components';
import EditEmail from '@bufferapp/edit-email';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import Security from '../Security';

const PreferenceContent = ({ tabId, onUnknownTab }) => {
  switch (tabId) {
    case 'general':
      return <EditEmail />;
    case 'security':
      return <Security />;
    case 'appsandextras':
      return <Text>Apps & Extras Content Goes Here</Text>;
    default:
      onUnknownTab();
      return <Text>Redirecting...</Text>;
  }
};

PreferenceContent.propTypes = {
  tabId: PropTypes.string.isRequired,
  onUnknownTab: PropTypes.func.isRequired,
};

const Preferences = ({
  selectedTabId,
  onTabClick,
  onBackToDashboardClick,
  onUnknownTab,
  selectedProfileId,
  profiles,
}) => (
  <div
    style={{
      display: 'flex',
      height: '100%',
    }}
  >
    <div
      style={{
        flexBasis: '16rem',
        width: '16rem',
        minWidth: '16rem',
      }}
    >
      <ProfileSidebar />
    </div>
    <div
      style={{
        flexGrow: 1,
        padding: '0 1rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div id={'tabs'}>
        <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
          <Tab tabId={'general'}>General</Tab>
          <Tab tabId={'security'}>Security</Tab>
          <Tab tabId={'appsandextras'}>Apps & Extras</Tab>
        </Tabs>
      </div>
      <Link
        href={'#'}
        onClick={(e) => {
          e.preventDefault();
          onBackToDashboardClick({
            selectedProfileId,
            profiles,
          });
        }}
        unstyled
      >
        <div
          style={{
            display: 'flex',
            margin: '1rem 0',
            alignItems: 'center',
          }}
        >
          <ArrowLeftIcon
            size={{
              width: '0.9rem',
              height: '0.9rem',
            }}
          />
          <div style={{ marginLeft: '0.5rem' }}>
            <Text size={'mini'} color={'curiousBlue'}>
              Back To Dashboard
            </Text>
          </div>
        </div>
      </Link>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        <PreferenceContent tabId={selectedTabId} onUnknownTab={onUnknownTab} />
      </div>
    </div>
  </div>
);

Preferences.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onBackToDashboardClick: PropTypes.func.isRequired,
  onUnknownTab: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
};

Preferences.defaultProps = {
  selectedProfileId: undefined,
  profiles: [],
};

export default Preferences;
