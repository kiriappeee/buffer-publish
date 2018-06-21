import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Select,
  Text,
} from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';

const DayToStartTheWeek = ({ input }) =>
  <Select
    value={input.value}
    options={[{
      value: 'Sunday',
      name: 'Sunday',
    }, {
      value: 'Monday',
      name: 'Monday',
    }]}
    onChange={input.onChange}
  />;

DayToStartTheWeek.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
};


const SelectDayToStartTheWeek = () =>
  <Row>
    <Text>Day to start the week</Text>
    <form style={{ minWidth: '185px' }}>
      <Field
        component={DayToStartTheWeek}
        name="dayToStartTheWeek"
      />
    </form>
  </Row>;

SelectDayToStartTheWeek.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'day-to-start-the-week',
})(SelectDayToStartTheWeek);
