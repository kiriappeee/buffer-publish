import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';

import LinkShorteningWrapper from './LinkShorteningWrapper';

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const pinterestSectionStyling = {
  padding: '10px',
  background: '#efefef',
  borderRadius: '6px',
  backgroundClip: 'padding-box',
  width: '100%',
};

const LinkShortening = ({
    onOptionSelect,
    profileService,
    linkShorteners,
    loading,
    selectedShortener,
  }) => {
  const linkList = linkShorteners && linkShorteners.map(ls => ({
    value: ls.domain,
    name: `${ls.domain} ${ls.login ? `- ${ls.login}` : ''}`,
    selected: ls.selected,
  }));

  if (profileService === 'pinterest') {
    return (
      <LinkShorteningWrapper
        loading={false}
        startSectionStyles={{
          width: '100%',
        }}
      >
        <div style={textWrapperStyle}>
          <div
            style={pinterestSectionStyling}
          >
            <Text>
              Sadly, at the moment Pinterest does not allow posting of shortened links. <br />
              For more,
              read all about it <a
                href="https://help.pinterest.com/en/articles/blocked-links-and-websites"
                rel="noopener noreferrer"
                target="_blank"
              >here</a>.
            </Text>
          </div>
        </div>
      </LinkShorteningWrapper>);
  }
  return (
    <LinkShorteningWrapper
      loading={loading}
      startSectionStyles={{
        maxWidth: '600px',
      }}
      onOptionSelect={onOptionSelect}
      linkList={linkList}
      selectedShortener={selectedShortener}
    >
      <div style={textWrapperStyle}>
        <Text size="mini">
          Are your links feeling a little long? Well worry no longer, choose one of our link
          shorteners or connect your own bit.ly account and Buffer will make sure that your
          links are shortened whenever you post.
        </Text>
      </div>
    </LinkShorteningWrapper>
  );
};

LinkShortening.defaultProps = {
  onOptionSelect: null,
  linkShorteners: null,
  loading: true,
  profileService: null,
  selectedShortener: null,
};

LinkShortening.propTypes = {
  profileService: PropTypes.string,
  onOptionSelect: PropTypes.func,
  linkShorteners: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string,
      selected: PropTypes.bool,
      tracking: PropTypes.bool,
      login: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  selectedShortener: PropTypes.string,
};

export default LinkShortening;
