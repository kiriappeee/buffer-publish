import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { constants } from '@bufferapp/publish-utils';

import ProfileBadge from './index';

const avatarUrl = 'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png';
const stories = storiesOf('ProfileBadge').addDecorator(checkA11y);

constants.SERVICE_NAMES.forEach(
  service => stories.add(
    `${service}`,
    () => (<ProfileBadge avatarUrl={avatarUrl} type={service} />),
  ),
);
