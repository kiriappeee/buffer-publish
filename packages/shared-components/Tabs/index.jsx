import React from 'react';
import PropTypes from 'prop-types';
import {
  geyser,
} from '@bufferapp/components/style/color';
import Tab from '../Tab';

const tabsStyle = {
  borderBottom: `1px solid ${geyser}`,
};

const Tabs = ({ children, activeTabId }) => (
  <div style={tabsStyle}>
    {React.Children.map(children, tab => (
        React.cloneElement(tab, {
          // pass props from `Tabs` to `Tab`
          active: tab.props.tabId === activeTabId,
          onClick: tab.props.onClick,
        })
    ))}
  </div>
);

Tabs.propTypes = {
  children: PropTypes.node,
  activeTabId: React.PropTypes.string,
};

Tab.defaultProps = {
  tab: [],
};

export default Tabs;