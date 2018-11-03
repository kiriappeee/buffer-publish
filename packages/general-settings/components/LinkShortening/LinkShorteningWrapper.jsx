import { Button, Text } from '@bufferapp/components';
import Select from '@bufferapp/components/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { BufferLoading } from '@bufferapp/publish-shared-components';

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const bitlyWrapperSidebarStyle = {
  flex: 'auto',
  flexDirection: 'column',
};

const wrapperSidebarStyle = {
  textAlign: 'right',
  whiteSpace: 'nowrap',
  marginLeft: '0.5rem',
  minWidth: '140px',
};

const loadingContainerStyle = {
  ...wrapperSidebarStyle,
  paddingTop: '1.5rem',
  textAlign: 'center',
};

const containerStyling = {
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'row',
  marginBottom: '0.5rem',
  width: '100%',
  alignItems: 'center',
};

const connectBitlyButton = {
  marginTop: '0.5rem',
  width: '100%',
};

const LinkShorteningWrapper = ({
    onOptionSelect,
    children,
    linkList,
    startSectionStyles,
    loading,
    selectedShortener,
    showConnectBitly,
  }) => {
  const selectedValue = selectedShortener || (linkList && linkList.filter(ll => ll.selected));

  return (
    <div
      style={containerStyling}
    >
      <div
        style={startSectionStyles}
      >
        <div style={textWrapperStyle}>
          <Text color={'outerSpace'}>Link Shortening</Text>
        </div>
        {children}
      </div>
      {loading &&
        <div
          style={loadingContainerStyle}
        >
          <BufferLoading size={32} />
        </div>
      }
      {linkList && !loading &&
        <div
          style={{
            ...wrapperSidebarStyle,
            ...(showConnectBitly ? bitlyWrapperSidebarStyle : {}),
          }}
        >
          <div>
            <Select
              options={linkList}
              onChange={onOptionSelect}
              value={selectedValue && selectedValue[0].value}
            />
          </div>
          {showConnectBitly &&
            <div style={connectBitlyButton} >
              <Button fillContainer>Connect Bit.ly</Button>
            </div>
          }
        </div>
      }
    </div>
  );
};

LinkShorteningWrapper.defaultProps = {
  onOptionSelect: null,
  linkList: null,
  startSectionStyles: null,
  loading: true,
  selectedShortener: null,
  showConnectBitly: false,
};

LinkShorteningWrapper.propTypes = {
  onOptionSelect: PropTypes.func,
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  linkList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    selected: PropTypes.bool,
  })),
  startSectionStyles: PropTypes.shape({
    width: PropTypes.string,
    maxWidth: PropTypes.string,
  }),
  selectedShortener: PropTypes.string,
  showConnectBitly: PropTypes.bool,
};

export default LinkShorteningWrapper;
