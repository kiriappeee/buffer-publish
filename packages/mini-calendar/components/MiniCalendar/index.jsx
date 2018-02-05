import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import {
  Text,
} from '@bufferapp/components';

const MiniCalendar = () =>
  <div>
    <DayPicker />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
