import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Select,
  Text,
} from '@bufferapp/components';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 0',
};

const DateTimePreferences = ({ changeTwentyFourHourFormat, changeStartOfWeek, twentyFourHourTime, weekStartsMonday }) =>
  <div>
    <section style={rowStyle}>
      <Text>Time format</Text>
      <form onChange={changeTwentyFourHourFormat}>
        <input checked={!twentyFourHourTime} type="radio" id="twelveHourFormat" name="time-format" value="12" />
        <label for="twelveHourFormat"><Text>12 hour</Text></label>
        <input checked={twentyFourHourTime} type="radio" id="twentyFourHourFormat" name="time-format" value="24" />
        <label for="twentyFourHourFormat"><Text color="outerSpace">24 hour</Text></label>
      </form>
    </section>
    <Divider />
    <section style={rowStyle}>
      <Text>Day to start the week</Text>
      <form style={{minWidth: '185px'}}>
        <Select
          value={ weekStartsMonday ? 'Monday' : 'Sunday' }
          onChange={changeStartOfWeek}
          options={[{
            value: 'Sunday',
            name: 'Sunday',
          }, {
            value: 'Monday',
            name: 'Monday'
          }]}
        />
      </form>
    </section>
  </div>;

DateTimePreferences.propTypes = {
  twentyFourHourTime: PropTypes.bool.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  changeTwentyFourHourFormat: PropTypes.func.isRequired,
  changeStartOfWeek: PropTypes.func.isRequired,
};

export default DateTimePreferences;
