import React from 'react';

import ChangePassword from '@bufferapp/change-password';
import TwoFactorAuth from '@bufferapp/publish-two-factor-auth';
import { Divider } from '@bufferapp/components';

const Security = () => (
  <React.Fragment>
    <ChangePassword />
    <Divider marginTop="1.5rem" marginBottom="1.5rem" />
    <TwoFactorAuth />
  </React.Fragment>
);

export default Security;
