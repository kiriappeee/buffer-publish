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

const statsBarStyle = {
  display: 'flex',
  backgroundColor: '#fcfcfc',
  marginRight: '-1px',
};

const statsCellStyle = {
  flexGrow: 1,
  flexBasis: 0,
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  borderTop: `${borderWidth} solid ${mystic}`,
  padding: '0.5rem',
  borderRight: `${borderWidth} solid ${mystic}`,
};

/* Abbreviates numbers, eg: if we want 2 decimal places, it displays 1240 as 1.24k */
const abbreviateNumber = (number, decPlaces) => {
  decPlaces = 10 ** decPlaces;
  const abbreviations = [ "k", "m", "b", "t" ];

  for (let i=abbreviations.length-1; i>=0; i--) {
    const size = 10 ** ((i + 1) * 3);
    if(size <= number) {
      number = Math.round(number*decPlaces/size)/decPlaces;
      if((number == 1000) && (i < abbreviations.length - 1)) {
        number = 1;
        i++;
      }
      number += abbreviations[i];
      break;
    }
  }
  return number;
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
        <Text size={'extra-large'} color={'black'}>{abbreviateNumber(value, 1)}</Text>
        <Text size={'mini'}>&nbsp; {title}</Text>
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