import { Divider } from '@bufferapp/components';
import React from 'react';
import PropTypes from 'prop-types';
import InstagramDirectUpload from '../InstagramDirectUpload/index';

const GeneralSettings = ({
  onSetUpDirectPostingClick,
}) => (
  <div>
    <InstagramDirectUpload
      onSetUpDirectPostingClick={onSetUpDirectPostingClick}
    />
    <Divider />
  </div>
);
GeneralSettings.defaultProps = {
  loading: false,
};

GeneralSettings.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default GeneralSettings;
