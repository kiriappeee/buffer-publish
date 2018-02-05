import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';

const containerStyle = {
  position: 'absolute',
  right: '37px',
  marginTop: '70px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid grey',
  padding: '10px',
}
const MiniCalendar = () =>
  <div style={containerStyle}>
    <DayPicker />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
