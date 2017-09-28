import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';
import { dayMap } from './utils/transformSchedule';

// This depends on the schedule format of the profile for 'settings_schedule' enabled
const updateScheduleTimeForApi = (unformattedSchedule, action) => {
  if (!Array.isArray(unformattedSchedule)) return [];

  unformattedSchedule.forEach((scheduleItem) => {
    if (scheduleItem.days.includes(action.dayName)) {
      scheduleItem.times[action.timeIndex] = `${action.hours}:${action.minutes}`;
      scheduleItem.times.sort();
    }
  });

  return unformattedSchedule;
};

const deleteTimeFromSchedule = (unformattedSchedule, action) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  const formattedSchedule = [...unformattedSchedule];
  formattedSchedule.forEach((scheduleItem) => {
    if (scheduleItem.days.includes(action.dayName)) {
      const removedTime = scheduleItem.times[action.timeIndex];
      scheduleItem.times = scheduleItem.times.filter(time => time !== removedTime);
    }
  });
  return formattedSchedule;
};

const addTimeToScheduleForApi = (unformattedSchedule, action) => {
  const multDays = ['weekends', 'weekdays', 'everyday'];
  const everyday = Object.keys(dayMap);
  const weekdays = everyday.slice(0, 5);
  const weekends = everyday.slice(-2);
  const daysMap = {
    everyday,
    weekdays,
    weekends,
  };

  const newTime = `${action.hours}:${action.minutes}`;
  const daysToAdd = multDays.includes(action.dayName) ? daysMap[action.dayName] : [action.dayName];

  daysToAdd.forEach((dayToAdd) => {
    unformattedSchedule.forEach((daySchedule) => {
      if (daySchedule.days.includes(dayToAdd)) {
        daySchedule.times.push(newTime);
        daySchedule.times.sort();
      }
    });
  });

  return unformattedSchedule;
};

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.UPDATE_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: updateScheduleTimeForApi(getState().settings.schedules, action),
        },
      }));
      break;
    case actionTypes.ADD_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: addTimeToScheduleForApi(getState().settings.schedules, action),
        },
      }));
      break;
    case actionTypes.REMOVE_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: deleteTimeFromSchedule(getState().settings.schedules, action),
        },
      }));
      break;
    case actionTypes.UPDATE_TIMEZONE:
      dispatch(dataFetchActions.fetch({
        name: 'updateTimezone',
        args: {
          profileId: action.profileId,
          timezone: action.timezone,
          city: action.city,
        },
      }));
      break;
    case actionTypes.GET_TIMEZONES:
      dispatch(dataFetchActions.fetch({
        name: 'getTimezones',
        args: {
          query: action.query,
        },
      }));
      break;
    case `updateSchedule_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! Your schedule has been successfully saved.',
      }));
      break;
    case `updateSchedule_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `updateTimezone_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! Your schedule has been successfully saved.',
      }));
      break;
    case `updateTimezone_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    default:
      break;
  }
};
