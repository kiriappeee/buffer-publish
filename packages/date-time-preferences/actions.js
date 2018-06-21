import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DATE_TIME_PREFERENCES', {
  CHANGE_TWENTY_FOUR_HOUR_FORMAT: 0,
  CHANGE_START_OF_WEEK: 0,
});

export default {
  changeTwentyFourHourFormat: twentyFourHourFormat => ({
    type: actionTypes.CHANGE_TWENTY_FOUR_HOUR_FORMAT,
    twentyFourHourFormat,
  }),
  changeStartOfWeek: weekStartsOnMonday => ({
    type: actionTypes.CHANGE_START_OF_WEEK,
    weekStartsOnMonday,
  }),
};
