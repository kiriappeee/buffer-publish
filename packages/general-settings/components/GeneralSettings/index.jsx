import React from 'react';
import PropTypes from 'prop-types';
import InstagramDirectPosting from '../InstagramDirectPosting';

const GeneralSettings = ({
  directPostingEnabled,
  onSetUpDirectPostingClick,
}) => (
  <div>
    {!directPostingEnabled &&
      <InstagramDirectPosting
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
