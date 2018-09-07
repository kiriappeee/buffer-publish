/*
This DatePicker is not importing react-day-picker styles,
it is using DatePicker.css from the buffer-composer.
In the future the styles should probably be independent.
*/

import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import { ArrowRightIcon, ArrowLeftIcon } from '@bufferapp/components/Icon/Icons';
import { Button } from '@bufferapp/components';
import 'react-day-picker/lib/style.css'; // Not being used.
import moment from 'moment-timezone';
import { actions } from '../../reducer';

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
  getNumberPostsByDate,
}) => {
  const styleLeft = {
    float: 'left',
  };

  const styleRight = {
    float: 'right',
  };

  const onNext = () => {
    onNextClick();
    getNumberPosts(nextMonth);
  };

  const onPrev = () => {
    onPreviousClick();
    getNumberPosts(previousMonth);
  };

  const getNumberPosts = (newMonth) => {
    const startDate = moment(newMonth).startOf('month').unix();
    const endDate = moment(newMonth).endOf('month').unix();
    getNumberPostsByDate(startDate, endDate);
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

const MiniCalendar = ({numberPostsByDate, onMiniCalendarMonthChange}) => {

  /* Requests the number of posts for the current month when open the calendar */
  if(!numberPostsByDate) {
    const startDate = moment().startOf('month').unix();
    const endDate = moment().endOf('month').unix();
    onMiniCalendarMonthChange(startDate, endDate);
  };

  /* Renders content of each day cell and adds number of posts if they exist */
  const renderDay = (day) => {
    const dayString = day.toDateString();
    const numPosts = numberPostsByDate && numberPostsByDate[dayString];
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
        navbarElement={<NavBar getNumberPostsByDate={onMiniCalendarMonthChange} />}
        fromMonth={firstMonthDisplay}
        renderDay={renderDay}
        modifiers={modifiers}
        showOutsideDays
      />
    </div>
  );
};

MiniCalendar.propTypes = {
  onMiniCalendarMonthChange: PropTypes.func.isRequired,
  numberPostsByDate: PropTypes.object,
};

MiniCalendar.defaultProps = {
  numberPostsByDate: null,
};

export default MiniCalendar;
