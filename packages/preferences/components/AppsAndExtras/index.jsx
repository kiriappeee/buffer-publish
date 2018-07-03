import React from 'react';
import ManageAppsAndExtras from '@bufferapp/manage-apps-extras';

const connectedApps = [
  {
    id: 1,
    name: 'Buffer client 1',
  },
  {
    id: 2,
    name: 'Buffer client 2',
  },
];

const AppsAndExtras = () => <ManageAppsAndExtras connectedApps={connectedApps} />;

export default AppsAndExtras;
