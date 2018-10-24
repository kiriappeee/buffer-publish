import React from 'react';
import PropTypes from 'prop-types';
import InstagramDirectUpload from '../InstagramDirectUpload';

const GeneralSettings = ({
  directPostingEnabled,
  onSetUpDirectPostingClick,
}) => (
  <div>
    {!directPostingEnabled &&
      <InstagramDirectUpload
        onSetUpDirectPostingClick={onSetUpDirectPostingClick}
      />
    }
  </div>
);

GeneralSettings.defaultProps = {
  directPostingEnabled: false,
};

GeneralSettings.propTypes = {
  directPostingEnabled: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default GeneralSettings;
