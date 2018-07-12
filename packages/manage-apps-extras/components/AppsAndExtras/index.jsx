import React from 'react';
import AppsManager from '../AppsManager';
import ExtrasLinks from '../ExtrasLinks';

const AppsAndExtras = props => (
  <div>
    <ExtrasLinks />
    <AppsManager {...props} />
  </div>
);

export default AppsAndExtras;
