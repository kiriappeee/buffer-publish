import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  CircleTwitterIcon,
  CircleFacebookIcon,
  CircleGooglePlusIcon,
  CircleInstagramIcon,
  CirclePinterestIcon,
  CircleLinkedInIcon,
} from '@bufferapp/components';

import { geyser } from '@bufferapp/components/style/color';

import { constants } from '@bufferapp/publish-utils';

const profileBadgeStyle = {
  position: 'relative',
  height: '2rem',
  width: '2rem',
  background: geyser,
  borderRadius: '100%',
};

const profileBadgeIconStyle = {
  position: 'absolute',
  bottom: '-2px',
  right: '-4px',
  borderRadius: '100%',
  height: '16px',
  width: '16px',
  boxShadow: 'inset 0 0 16px 16px #fff',
};

const badgeTypes = PropTypes.oneOf(constants.SERVICE_NAMES);

const profileBadgeIconMap = new Map([
  [constants.SERVICE_TWITTER, { component: CircleTwitterIcon, color: 'twitter' }],
  [constants.SERVICE_FACEBOOK, { component: CircleFacebookIcon, color: 'facebook' }],
  [constants.SERVICE_LINKEDIN, { component: CircleLinkedInIcon, color: 'linkedin' }],
  [constants.SERVICE_GOOGLE, { component: CircleGooglePlusIcon, color: 'googleplus' }],
  [constants.SERVICE_PINTEREST, { component: CirclePinterestIcon, color: 'pinterest' }],
  [constants.SERVICE_INSTAGRAM, { component: CircleInstagramIcon, color: 'instagram' }],
]);

const ProfileBadgeIcon = ({ type }) => {
  const icon = profileBadgeIconMap.get(type);
  if (icon) {
    const { component: IconComponent, color } = icon;
    return <IconComponent color={color} />;
  }
  return null;
};

ProfileBadgeIcon.propTypes = {
  type: badgeTypes.isRequired,
};

const ProfileBadge = ({
  avatarUrl,
  type,
}) =>
  <div style={profileBadgeStyle}>
    <Image
      border={'circle'}
      src={avatarUrl}
      height={'100%'}
      width={'100%'}
      verticalAlignBottom
    />
    <div style={profileBadgeIconStyle}>
      <ProfileBadgeIcon type={type} />
    </div>
  </div>;

ProfileBadge.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  type: badgeTypes.isRequired,
};

export default ProfileBadge;
