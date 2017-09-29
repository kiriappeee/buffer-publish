import React, { Component } from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  overflowY: 'auto',
  marginTop: '1rem',
  paddingRight: '1rem',
  paddingLeft: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
};

class ScrollableContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.tabId !== prevProps.tabId) {
      this.containerEl.scrollTop = 0;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={(container) => { this.containerEl = container; }}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }
}

ScrollableContainer.propTypes = {
  tabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ScrollableContainer;
