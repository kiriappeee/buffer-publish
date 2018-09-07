/*
This DatePicker is not importing react-day-picker styles,
it is using DatePicker.css from the buffer-composer.
In the future the styles should probably be independent.
The react-day-picker styles were left here commented as
a precaution, in case there's a change in buffer-composer
and DatePicker.css no longer applies.
*/

import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import { ArrowRightIcon, ArrowLeftIcon } from '@bufferapp/components/Icon/Icons';
import { Button } from '@bufferapp/components';
// import 'react-day-picker/lib/style.css'; // Not being used. See comment on top.
import moment from 'moment-timezone';

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
  height: '1.6rem',
  width: '1.9rem',
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
const firstMonthDisplay = moment().subtract(1, 'month').toDate();

const NavBar = ({
  month,
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
  getNumberOfPostsByDate,
}) => {
  const styleLeft = {
    float: 'left',
  };

  const styleRight = {
    float: 'right',
  };

  const onNext = () => {
    onNextClick();
    getNumberOfPosts(nextMonth);
  };

  const onPrev = () => {
    onPreviousClick();
    getNumberOfPosts(previousMonth);
  };

  const getNumberOfPosts = (newMonth) => {
    const startDate = moment(newMonth).startOf('month').unix();
    const endDate = moment(newMonth).endOf('month').unix();
    getNumberOfPostsByDate(startDate, endDate);
  };

  const showPreviousButton = (moment(month).isAfter(firstMonthDisplay, 'month')) ? true : false;

  return (
    <div className={className}>
      <div style={styleLeft}>
        { showPreviousButton &&
          <Button style={styleLeft} noStyle onClick={onPrev}>
            <ArrowLeftIcon/>
          </Button>
        }
      </div>
      <div style={styleRight}>
        <Button noStyle onClick={onNext}>
          <ArrowRightIcon/>
        </Button>
      </div>
    </div>
  );
};

const modifiers = {
  isToday: new Date(),
  disabled: {
    before: new Date(),
  },
};

const MiniCalendar = ({numberOfPostsByDate, onMonthChange}) => {

  /* Requests the number of posts for the current month when open the calendar */
  if(!numberOfPostsByDate) {
    const startDate = moment().startOf('month').unix();
    const endDate = moment().endOf('month').unix();
    onMonthChange(startDate, endDate);
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
      <DayPicker
        navbarElement={<NavBar getNumberOfPostsByDate={onMonthChange} />}
        fromMonth={firstMonthDisplay}
        renderDay={renderDay}
        modifiers={modifiers}
        showOutsideDays
      />
    </div>
  );
};

MiniCalendar.propTypes = {
  onMonthChange: PropTypes.func.isRequired,
  numberOfPostsByDate: PropTypes.object,
};

MiniCalendar.defaultProps = {
  numberOfPostsByDate: null,
};

export default MiniCalendar;
