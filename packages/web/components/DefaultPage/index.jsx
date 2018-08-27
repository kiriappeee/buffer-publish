import React from 'react';

import {
  Text
} from '@bufferapp/components';

import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import { EmptyState } from '@bufferapp/publish-shared-components';

const pageStyle = {
  display: 'flex',
  flexGrow: 1,
  height: '100%',
};

const profileSideBarStyle = {
  flexBasis: '16rem',
  width: '16rem',
  minWidth: '16rem',
};

const defaultPageStyle = {
  padding: '1rem',
  textAlign: 'center',
  flex: '1',
};

export default () => (
  <div style={pageStyle}>
    <div style={profileSideBarStyle}>
      <ProfileSidebar />
    </div>
    <div style={defaultPageStyle}>
      <EmptyState
        heroImg="https://s3.amazonaws.com/buffer-publish/images/buffer-social-media-management.svg"
        title="Let's get your account set up!"
        heroImgSize={{ width: '560', height: '284'}}
      />
    </div>
  </div>
);
