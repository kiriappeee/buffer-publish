import React from 'react';
import PropTypes from 'prop-types';
import InstagramDirectUpload from '../InstagramDirectUpload/index';

const GeneralSettings = ({
  onSetUpDirectPostingClick,
  showInstagramDirectPostingComponent,
}) => (
  <div>
    {!showInstagramDirectPostingComponent &&
      <InstagramDirectUpload
        onSetUpDirectPostingClick={onSetUpDirectPostingClick}
      />
    }
  </div>
);
GeneralSettings.defaultProps = {
  showInstagramDirectPostingComponent: PropTypes.bool,
};

GeneralSettings.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  showInstagramDirectPostingComponent: PropTypes.bool,
};

export default GeneralSettings;
