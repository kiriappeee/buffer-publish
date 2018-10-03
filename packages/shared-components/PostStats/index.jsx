import React from 'react';
import PropTypes from 'prop-types';
import { 
  Text,
  Link,
} from '@bufferapp/components';
import {
  borderWidth,
} from '@bufferapp/components/style/border';
import {
  mystic,
} from '@bufferapp/components/style/color';
import { 
  constants,
} from '@bufferapp/publish-utils';
import { 
  abbreviateNumber,
} from '@bufferapp/publish-utils/number';

const statsBarStyle = {
  display: 'flex',
  backgroundColor: '#fcfcfc',
  marginRight: '-1px',
};

const statsCellStyle = {
  flexGrow: 1,
  flexBasis: 0,
  borderTop: `${borderWidth} solid ${mystic}`,
  padding: '0.25rem',
  borderRight: `${borderWidth} solid ${mystic}`,
  textAlign: 'center',
};

const statsNumberStyle ={
  lineHeight: '1.25rem',
};

const PostStats = ({
  statistics,
  profileService,
}) => {
  const titles = {
    retweets: 'Retweet',
    comments: 'Comment',
    likes: 'Like',
    favorites: 'Like',
    mentions: 'Mention',
    clicks: 'Click',
    reach_twitter: 'Potential',
    reach: 'Reach',
    shares: 'Share',
    reshares: 'Reshare',
    repins: 'Repin',
    plusOne: '+1',
  };

  const createElement = (typeStats) => {
    let isLinkedinClicks = (typeStats === 'clicks' && profileService === 'linkedin');
    let value = statistics[typeStats];
    let title = titles[typeStats];
    if (typeStats === 'reach_twitter' && profileService === 'twitter') {
      value = statistics['reach'];
    }
    if (typeStats === 'reach' && profileService === 'twitter') {
      return;
    }
    if ((typeStats !== 'reach' && typeStats !== 'reach_twitter' && typeStats !== 'plusOne') && value !== 1) {
      title += 's';
    }

    return value === undefined ? null : (
      <div style={statsCellStyle} key={typeStats}>
        <div style={statsNumberStyle}>
          <Text size={'large'} color={'black'}>{abbreviateNumber(value, 1)}</Text>
        </div>
        <Text size={'mini'}>{title}</Text>
        {isLinkedinClicks && 
          <Link href={'https://faq.buffer.com/article/181-why-does-linkedin-sometimes-show-a-different-number-for-clicks'} unstyled>*</Link>
        }
      </div>
    );
  };
  
  return (
    <div style={statsBarStyle}>
      {Object.keys(titles).map((typeStats) => createElement(typeStats))}
    </div>
  );
};

PostStats.propTypes = {
  profileService: PropTypes.oneOf(constants.SERVICE_NAMES),
};

export default PostStats;