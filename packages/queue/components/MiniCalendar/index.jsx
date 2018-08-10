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

const fakeDateData = {
  'Tue Feb 06 2018': 4,
  'Wed Feb 07 2018': 2,
  'Thu Feb 08 2018': 1,
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
}) => {
  const styleLeft = {
    float: 'left',
  };

  const styleRight = {
    float: 'right',
  };

  const onNext = () => {
    onNextClick();
    // add our hooks here
  };

  const onPrev = () => {
    onPreviousClick();
    // add our hooks here
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

const renderDay = (day) => {
  const dayString = day.toDateString();
  const numPosts = fakeDateData[dayString];
  return (
    <div style={cellStyle}>
      <div style={dateStyle}>{day.getDate()}</div>
      {numPosts && <div style={numPostsStyle}>{numPosts + ' post'}{numPosts > 1 ? 's' : ''}</div>}
    </div>
  )
};

const modifiers = {
  isToday: new Date(),
  disabled: {
    before: new Date(),
  },
};

const MiniCalendar = () =>
  <div style={containerStyle}>
    <DayPicker
      navbarElement={<NavBar/>}
      fromMonth={firstMonthDisplay}
      renderDay={renderDay}
      modifiers={modifiers}
      showOutsideDays
    />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
