import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import {
  Popover,
  Card,
  Button,
  CircleXIcon,
} from '@bufferapp/components';
import {
  DateTimeForm,
} from '@bufferapp/web-components';
import styles from './style.css';

const RescheduleForm = ({
  draftId,
  timezone,
  onRescheduleOverlayClick,
  onRescheduleCloseClick,
  onRescheduleSubmit,
  settings,
  firstDayOfWeek,
  twentyFourHourTime,
}) => {
  if (!settings.showDateTimeForm) {
    return null;
  }
  const scheduleTime = moment().tz(timezone).add(3, 'hours');
  const initialValues = {
    date: {
      month: scheduleTime.month(),
      day: scheduleTime.date(),
      year: scheduleTime.year(),
    },
    time: {
      hours: scheduleTime.hour(),
      minutes: scheduleTime.minute(),
    },
  };

  const initialMonthYear = {
    month: scheduleTime.month(),
    year: scheduleTime.year(),
  };

  const disableBefore = {
    day: scheduleTime.date(),
    month: scheduleTime.month(),
    year: scheduleTime.year(),
  };

  return (
    <Popover
      transparentOverlay
      onOverlayClick={onRescheduleOverlayClick}
      right={`${settings.right}px`}
      top={`${settings.top}px`}
    >
      <Card>
        <div className={styles.dateTimeForm}>
          <div className={styles.rescheduleCloseButton}>
            <Button
              onClick={onRescheduleCloseClick}
              noStyle
            >
              <CircleXIcon />
            </Button>
          </div>
          <DateTimeForm
            initialMonthYear={initialMonthYear}
            initialValues={initialValues}
            disableBefore={disableBefore}
            timezoneLabel={timezone}
            firstDayOfWeek={firstDayOfWeek}
            select24Hours={twentyFourHourTime}
            onSubmit={({ date, time }) => onRescheduleSubmit({
              draftId,
              date,
              time,
              timezone,
            })}
          />
        </div>
      </Card>
    </Popover>
  );
};

RescheduleForm.propTypes = {
  draftId: PropTypes.string,
  timezone: PropTypes.string,
  onRescheduleOverlayClick: PropTypes.func,
  onRescheduleCloseClick: PropTypes.func,
  onRescheduleSubmit: PropTypes.func,
  settings: PropTypes.shape({
    right: PropTypes.number,
    top: PropTypes.number,
    showDateTimeForm: PropTypes.bool.isRequired,
  }).isRequired,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  twentyFourHourTime: PropTypes.bool,
}

export default RescheduleForm;
