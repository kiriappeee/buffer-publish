import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@bufferapp/components';

import {
  fontFamily,
  fontSize,
} from '@bufferapp/components/style/font';

import {
  curiousBlue,
  geyser,
} from '@bufferapp/components/style/color';

import {
  borderRadius,
  borderWidth,
} from '@bufferapp/components/style/border';

const formLabelStyle = {
  display: 'block',
  padding: '0 0 0.25rem 0',
};

const selectStyle = {
  fontFamily,
  fontSize,
  padding: '0.5rem',
  borderRadius,
  border: `${borderWidth} solid ${geyser}`,
  width: '100%',
  boxSizing: 'border-box',
  height: '37px',
};

const Select = ({ id, children, label, store }) => (
  <div>
    <label htmlFor={id} style={formLabelStyle}>
      <Text size="small">{label}</Text>
    </label>
    <select name={id} id={id} style={selectStyle} onChange={ev => store(id, ev.target.value)}>
      {children}
    </select>
  </div>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  store: PropTypes.func.isRequired,
};

export default Select;
