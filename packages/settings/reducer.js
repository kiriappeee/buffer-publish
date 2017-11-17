
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
  PAUSE_DAY: 'PAUSE_DAY',
  UNPAUSE_DAY: 'UNPAUSE_DAY',
  UPDATE_PAUSED_SCHEDULE: 'UPDATE_PAUSED_SCHEDULE',
  REMOVE_PAUSED_TIME: 'REMOVE_PAUSED_TIME',
  UPDATE_PAUSED_SCHEDULE_STATE: 'UPDATE_PAUSED_SCHEDULE_STATE',
};

const initialState = {
  settingsHeader: 'Your posting schedule',
  loading: false,
  scheduleLoading: true,
  days: [],
  schedules: [],
  pausedSchedules: [],
  items: [],
  profileTimezoneCity: '',
  hasTwentyFourHourTimeFormat: false,
  clearTimezoneInput: false,
  paused: false,
  profileId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        loading: false,
        days: transformSchedules(action.profile.schedules, action.profile.pausedSchedules),
        scheduleLoading: false,
        schedules: action.profile.schedules,
        pausedSchedules: action.profile.pausedSchedules,
        profileTimezoneCity: action.profile.timezone_city,
        settingsHeader: `Your posting schedule for ${action.profile.serviceUsername}`,
        paused: action.profile.paused,
        profileId: action.profile.id,
      };
    case profileActionTypes.PROFILE_PAUSED:
    case profileActionTypes.PROFILE_UNPAUSED:
      if (action.profileId === state.profileId) {
        return {
          ...state,
          paused: action.type === actionTypes.PROFILE_PAUSED,
        };
      }
      return state;
    case profileActionTypes.PUSHER_PROFILE_PAUSED_STATE:
      if (action.profileId === state.profileId) {
        return {
          ...state,
          paused: action.paused,
        };
      }
      return state;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        hasTwentyFourHourTimeFormat: action.result.hasTwentyFourHourTimeFormat,
      };
    case `updateSchedule_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        days: transformSchedules(action.result.schedules, state.pausedSchedules),
        schedules: action.result.schedules,
      };
    // Optimistically update the UI
    case actionTypes.UPDATE_PAUSED_SCHEDULE_STATE:
      return {
        ...state,
        days: transformSchedules(action.schedules, action.pausedSchedules),
        schedules: action.schedules,
        pausedSchedules: action.pausedSchedules,
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
  handleRemoveTimeClick: ({ hours, minutes, dayName, profileId, timeIndex, paused }) => ({
    type: paused ? actionTypes.REMOVE_PAUSED_TIME : actionTypes.REMOVE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
    paused,
  }),
  handleUpdateTime: ({ hours, minutes, dayName, profileId, timeIndex, paused }) => ({
    type: paused ? actionTypes.UPDATE_PAUSED_SCHEDULE : actionTypes.UPDATE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
    paused,
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
  handlePauseToggleClick: ({ dayName, profileId, paused }) => ({
    type: paused ? actionTypes.UNPAUSE_DAY : actionTypes.PAUSE_DAY,
    dayName,
    profileId,
  }),
  handlePauseScheduleChanges: ({ pausedSchedules, schedules, profileId }) => ({
    type: actionTypes.UPDATE_PAUSED_SCHEDULE_STATE,
    pausedSchedules,
    schedules,
    profileId,
  }),
};
