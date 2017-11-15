import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';
import {
  addTimeToScheduleForApi,
  deleteTimeFromPausedSchedulesForApi,
  deleteTimeFromSchedule,
  updatePausedSchedulesForApi,
  updateScheduleTimeForApi,
  removePausedDaysFromScheduleForApi,
  addPausedDayBackToScheduleForApi,
  removeDayFromPausedSchedulesForApi,
  addDayToPausedSchedulesForApi } from './utils/scheduleUtils';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.UPDATE_PAUSED_SCHEDULE:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules:
            updatePausedSchedulesForApi(
              getState().settings.schedules, getState().settings.days, action),
          schedules: getState().settings.schedules,
        },
      }));
      break;
    case actionTypes.UPDATE_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: updateScheduleTimeForApi(getState().settings.schedules, action),
        },
      }));
      break;
    case actionTypes.PAUSE_DAY:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules:
            addDayToPausedSchedulesForApi(
              action.dayName, getState().settings.schedules, getState().settings.days),
          schedules:
            removePausedDaysFromScheduleForApi(action.dayName, getState().settings.schedules),
        },
      }));
      break;
    case actionTypes.UNPAUSE_DAY:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules:
            removeDayFromPausedSchedulesForApi(
              action.dayName, getState().settings.schedules, getState().settings.days),
          schedules:
            addPausedDayBackToScheduleForApi(
              action.dayName, getState().settings.schedules, getState().settings.days),
          empty_paused_schedules:
            removeDayFromPausedSchedulesForApi(
              action.dayName, getState().settings.schedules, getState().settings.days).length === 0,
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
    case actionTypes.REMOVE_PAUSED_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules:
            deleteTimeFromPausedSchedulesForApi(
              getState().settings.schedules, getState().settings.days, action),
          schedules: getState().settings.schedules,
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
