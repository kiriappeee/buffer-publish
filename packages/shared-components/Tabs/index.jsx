import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
} from '@bufferapp/components';

const Tabs = ({
  children,
  selectedTabId,
  onTabClick,
}) => (
  <div>
    {React.Children.map(children, (tab) => {
      if (!tab.props.tabId) return tab;
      return React.cloneElement(tab, {
        selected: selectedTabId === tab.props.tabId,
        onClick: onTabClick,
      });
    })}
    <Divider marginTop={'0'} marginBottom={'0'} />
  </div>
);

Tabs.propTypes = {
  children: PropTypes.node,
  selectedTabId: PropTypes.string,
  onTabClick: PropTypes.func,
};

export default Tabs;
