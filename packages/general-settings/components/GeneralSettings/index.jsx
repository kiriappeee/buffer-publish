import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';

const GeneralSettings = ({
  directPostingEnabled,
  onSetUpDirectPostingClick,
  linkShorteners,
  profileService,
  loadingLinkShorteners,
  onLinkShortenerOptionSelect,
  selectedShortener,
}) => (
  <div>
    {!directPostingEnabled &&
    <InstagramDirectPosting
      onSetUpDirectPostingClick={onSetUpDirectPostingClick}
    />
    }
    <LinkShortening
      loading={loadingLinkShorteners}
      profileService={profileService}
      linkShorteners={linkShorteners}
      onOptionSelect={onLinkShortenerOptionSelect}
      selectedShortener={selectedShortener}
    />
    <Divider />
  </div>
);

GeneralSettings.defaultProps = {
  directPostingEnabled: false,
  profileService: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
};

GeneralSettings.propTypes = {
  directPostingEnabled: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  linkShorteners: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string,
      selected: PropTypes.bool,
      tracking: PropTypes.bool,
      login: PropTypes.string,
    }),
  ),
  onLinkShortenerOptionSelect: PropTypes.func,
  loadingLinkShorteners: PropTypes.bool,
  profileService: PropTypes.string,
  selectedShortener: PropTypes.string,
};

export default GeneralSettings;
