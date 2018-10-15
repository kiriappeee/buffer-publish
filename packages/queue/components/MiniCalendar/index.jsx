import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { InputDate } from '@bufferapp/components';

const containerStyle = {
  position: 'absolute',
  right: '0',
  marginTop: '3rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid #dce0e0',
  padding: '0.5rem',
  overflow: 'hidden',
  zIndex: '1',
};

const cellStyle = {
  maxHeight: '1rem',
};

const dateStyle = {
  top: '-0.3rem',
  position: 'relative',
};

const numPostsStyle = {
  fontSize: '0.3rem',
  position: 'relative',
  top: '-0.3rem',
};

/* MiniCalendar displays one month in the past */
const firstMonthToDisplay = moment().subtract(1, 'month').toDate();

const MiniCalendar = ({numberOfPostsByDate, onMonthChange}) => {

  /* Used to update number of posts when navigate to another month on DateInputNavBar */
  const onNavigationClick = (newMonth) => {
    const startDate = moment(newMonth).startOf('month').unix();
    const endDate = moment(newMonth).endOf('month').unix();
    onMonthChange(startDate, endDate);
  };

  /* Requests the number of posts for the current month when open the calendar */
  if(!numberOfPostsByDate) {
    onNavigationClick();
  };

  /* Renders content of each day cell and adds number of posts if they exist */
  const renderDay = (day) => {
    const dayString = day.toDateString();
    const numPosts = numberOfPostsByDate && numberOfPostsByDate[dayString];
    return (
      <div style={cellStyle}>
        <div style={dateStyle}>{day.getDate()}</div>
        {numPosts && <div style={numPostsStyle}>{numPosts + ' post'}{numPosts > 1 ? 's' : ''}</div>}
      </div>
    )
  };

  return (
    <div style={containerStyle}>
      <InputDate
        firstMonthToDisplay={firstMonthToDisplay}
        initialMonth={new Date()}
        onNavigationClick={onNavigationClick}
        renderDay={renderDay}
      />
    </div>
  );
};

MiniCalendar.propTypes = {
  onMonthChange: PropTypes.func.isRequired,
  numberOfPostsByDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

MiniCalendar.defaultProps = {
  numberOfPostsByDate: null,
};

export default MiniCalendar;
