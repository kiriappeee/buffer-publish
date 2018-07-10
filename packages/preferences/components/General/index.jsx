import React, { Fragment } from 'react';
import { Divider } from '@bufferapp/components';
import CloseAccount from '@bufferapp/close-account';
import EditEmail from '@bufferapp/edit-email';
import DateTimePreferences from '@bufferapp/date-time-preferences';

const General = () => (
  <Fragment>
    <EditEmail />
    <Divider />
    <DateTimePreferences />
    <Divider />
    <CloseAccount />
    <Divider />
  </Fragment>
);

export default General;
