import { dayMap } from './transformSchedule';

const getPausedSchedule = (unformattedSchedule, days) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  const pausedDays = days.filter(day => day.paused).map(pausedDay => pausedDay.key);
  const formattedSchedule = [...unformattedSchedule];
  return formattedSchedule.filter(scheduleItem => pausedDays.includes(scheduleItem.days[0]));
};

/**
 * addDayToPausedSchedulesForApi()
 *
 * Adds a day to the paused schedules array
 *
 * @param  {String}  dayName
 * @param  {Array} unformattedSchedule
 * @param  {Array} days
 * @return {Array}
 */

const addDayToPausedSchedulesForApi = (dayName, unformattedSchedule, days) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  const pausedDays = days.filter(day => day.paused).map(pausedDay => pausedDay.key);
  const formattedSchedule = [...unformattedSchedule];
  return formattedSchedule.filter(scheduleItem =>
    scheduleItem.days.includes(dayName) || pausedDays.includes(scheduleItem.days[0]));
};

/**
 * removeDayFromPausedSchedulesForApi()
 *
 * Removes a day from the paused schedules array, when unpausing
 *
 * @param  {String}  dayName
 * @param  {Array} unformattedSchedule
 * @param  {Array} days
 * @return {Array}
 */

const removeDayFromPausedSchedulesForApi = (dayName, unformattedSchedule, days) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  const pausedDays =
    days.filter(day => day.paused && day.key !== dayName).map(pausedDay => pausedDay.key);
  const formattedSchedule = [...unformattedSchedule];
  return formattedSchedule.filter(scheduleItem => pausedDays.includes(scheduleItem.days[0]));
};

/**
 * addPausedDayBackToScheduleForApi()
 *
 * Adds a paused day and it's times back into the schedule
 *
 * @param  {String}  dayName
 * @param  {Array} unformattedSchedule
 * @param  {Array} days
 * @return {Array}
 */

const addPausedDayBackToScheduleForApi = (dayName, unformattedSchedule, days) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  const pausedDay = days.filter(day => day.paused && day.key === dayName);
  const formattedTimes = pausedDay[0].times.map(time => `${time.value.hours}:${time.value.minutes}`);
  return unformattedSchedule.map(item => ({
    ...item,
    times: item.days.includes(pausedDay.key) ? formattedTimes : item.times,
  }));
};

/**
 * removePausedDaysFromScheduleForApi()
 *
 * Removes paused days from the schedules array
 *
 * @param  {String}  dayName
 * @param  {Array} unformattedSchedule
 * @param  {object} action
 * @return {Array}
 */

const removePausedDaysFromScheduleForApi = (dayName, unformattedSchedule) => {
  if (!Array.isArray(unformattedSchedule)) return [];
  return unformattedSchedule.map(item => ({
    ...item,
    times: item.days.includes(dayName) ? [] : item.times,
  }));
};

// This depends on the schedule format of the profile for 'settings_schedule' enabled
// TODO: Make this immutable.
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

/**
 * updatePausedSchedulesForApi()
 *
 * Edits a time in the paused schedules array
 *
 * @param  {String}  dayName
 * @param  {Array} unformattedSchedule
 * @param  {object} action
 * @return {Array}
 */
const updatePausedSchedulesForApi = (unformattedSchedule, days, action) => {
  const newSchedule = getPausedSchedule(unformattedSchedule, days, action);
  return updateScheduleTimeForApi(newSchedule, action);
};

// TODO: Make immutable.
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

const deleteTimeFromPausedSchedulesForApi = (unformattedSchedule, days, action) =>
  deleteTimeFromSchedule(getPausedSchedule(unformattedSchedule, days), action);

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

export { addTimeToScheduleForApi, deleteTimeFromPausedSchedulesForApi, deleteTimeFromSchedule,
         updatePausedSchedulesForApi, updateScheduleTimeForApi, removePausedDaysFromScheduleForApi,
         addPausedDayBackToScheduleForApi, removeDayFromPausedSchedulesForApi,
         addDayToPausedSchedulesForApi };
