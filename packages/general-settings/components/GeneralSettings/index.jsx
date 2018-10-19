import React from 'react';
import PropTypes from 'prop-types';
import InstagramDirectUpload from '../InstagramDirectUpload/index';

const GeneralSettings = ({
  direct_posting_enabled,
  onSetUpDirectPostingClick,
}) => (
  <div>
    {!direct_posting_enabled &&
      <InstagramDirectUpload
        onSetUpDirectPostingClick={onSetUpDirectPostingClick}
      />
    }
  </div>
);

// GeneralSettings.defaultProps = {
//   direct_posting_enabled: false,
// };

GeneralSettings.propTypes = {
  direct_posting_enabled: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default GeneralSettings;
