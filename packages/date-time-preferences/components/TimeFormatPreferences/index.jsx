import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Text } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';

const TimeFormatPreferences = ({ onChange }) =>
  <Row>
    <Text>Time format</Text>
    <form >
      <Field onChange={onChange} component="input" type="radio" id="twelveHourFormat" name="format" value="12" />
      <label htmlFor="twelveHourFormat" style={{ marginRight: '.5rem' }}><Text>12 hour</Text></label>
      <Field onChange={onChange} component="input" type="radio" id="twentyFourHourFormat" name="format" value="24" />
      <label htmlFor="twentyFourHourFormat"><Text color="outerSpace">24 hour</Text></label>
    </form>
  </Row>;

TimeFormatPreferences.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'time-format-preferences',
})(TimeFormatPreferences);
