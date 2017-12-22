

// a full week with a schedule time of 12:02pm for each day
const schedules = [
  { days: ['sun'], times: ['12:02'] },
  { days: ['mon'], times: ['12:02'] },
  { days: ['tue'], times: ['12:02'] },
  { days: ['wed'], times: ['12:02'] },
  { days: ['thu'], times: ['12:02'] },
  { days: ['fri'], times: ['12:02'] },
  { days: ['sat'], times: ['12:02'] },
];

// A full week with a schedule time at 12:02pm for each day
const days = [
  {
    dayName: 'Monday',
    key: 'mon',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Tuesday',
    key: 'tue',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Wednesday',
    key: 'wed',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Thursday',
    key: 'thu',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Friday',
    key: 'fri',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Saturday',
    key: 'sat',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
  {
    dayName: 'Sunday',
    key: 'sun',
    postingTimesTotal: 1,
    times: [
      {
        value: {
          hours: 12,
          minutes: 2,
        },
      },
    ],
    paused: false,
  },
];

// a pausedSchedule with one day
const pausedSchedules = [{ days: ['wed'], times: ['12:02'] }];
const mergedSchedules = [
  { days: ['sun'], times: ['12:02'] },
  { days: ['mon'], times: ['12:02'] },
  { days: ['tue'], times: ['12:02'] },
  { days: ['wed'], times: ['12:02'] },
  { days: ['thu'], times: ['12:02'] },
  { days: ['fri'], times: ['12:02'] },
  { days: ['sat'], times: ['12:02'] },
];

export default { days, pausedSchedules, schedules, mergedSchedules };
