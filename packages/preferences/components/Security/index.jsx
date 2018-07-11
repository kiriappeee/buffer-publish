import React, { Fragment } from 'react';

import ChangePassword from '@bufferapp/change-password';
import TwoFactorAuth from '@bufferapp/publish-two-factor-auth';
import { Divider } from '@bufferapp/components';

const Security = () => (
  <Fragment>
    <ChangePassword />
    <Divider />
    <TwoFactorAuth />
    <Divider />
  </Fragment>
);

export default Security;
