
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { transformSchedules } from './utils/transformSchedule';

export const actionTypes = {
  REMOVE_SCHEDULE_TIME: 'REMOVE_SCHEDULE_TIME',
  UPDATE_SCHEDULE_TIME: 'UPDATE_SCHEDULE_TIME',
  ADD_SCHEDULE_TIME: 'ADD_SCHEDULE_TIME',
  UPDATE_TIMEZONE: 'UPDATE_TIMEZONE',
  GET_TIMEZONES: 'GET_TIMEZONES',
  CLEAR_TIMEZONE_INPUT: 'CLEAR_TIMEZONE_INPUT',
  RESET_TIMEZONE_INPUT: 'RESET_TIMEZONE_INPUT',
};

const initialState = {
  settingsHeader: 'Your posting schedule',
  loading: false,
  scheduleLoading: true,
  days: [],
  schedules: [],
  items: [],
  profileTimezoneCity: '',
  hasTwentyFourHourTimeFormat: false,
  clearTimezoneInput: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        loading: false,
        days: transformSchedules(action.profile.schedules),
        scheduleLoading: false,
        schedules: action.profile.schedules,
        profileTimezoneCity: action.profile.timezone_city,
        settingsHeader: `Your posting schedule for ${action.profile.serviceUsername}`,
      };
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        hasTwentyFourHourTimeFormat: action.result.hasTwentyFourHourTimeFormat,
      };
    case `updateSchedule_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        days: transformSchedules(action.result.schedules),
        schedules: action.result.schedules,
      };
    case `updateTimezone_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        profileTimezoneCity: action.result.newTimezone,
        clearTimezoneInput: false,
      };
    case `getTimezones_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        items: action.result.suggestions,
      };
    case actionTypes.CLEAR_TIMEZONE_INPUT:
      return {
        ...state,
        clearTimezoneInput: true,
      };
    case actionTypes.RESET_TIMEZONE_INPUT:
      return {
        ...state,
        clearTimezoneInput: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleRemoveTimeClick: ({ hours, minutes, dayName, profileId, timeIndex }) => ({
    type: actionTypes.REMOVE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
  }),
  handleUpdateTime: ({ hours, minutes, dayName, profileId, timeIndex }) => ({
    type: actionTypes.UPDATE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
  }),
  handleAddPostingTime: ({ hours, minutes, dayName, profileId }) => ({
    type: actionTypes.ADD_SCHEDULE_TIME,
    hours,
    minutes,
    dayName,
    profileId,
  }),
  handleUpdateTimezone: ({ timezone, city, profileId }) => ({
    type: actionTypes.UPDATE_TIMEZONE,
    timezone,
    city,
    profileId,
  }),
  handleGetTimezones: ({ query }) => ({
    type: actionTypes.GET_TIMEZONES,
    query,
  }),
  handleTimezoneInputFocus: () => ({
    type: actionTypes.CLEAR_TIMEZONE_INPUT,
  }),
  handleTimezoneInputBlur: () => ({
    type: actionTypes.RESET_TIMEZONE_INPUT,
  }),
};
