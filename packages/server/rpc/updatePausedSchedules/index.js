const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'updatePausedSchedules',
  'update paused schedules for profile',
  async ({ profileId, pausedSchedules, schedules, emptyPausedSchedules }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/paused_schedules/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.accessToken,
          paused_schedules: pausedSchedules,
          schedules,
          empty_paused_schedules: emptyPausedSchedules,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw new Error(message);
      }
      throw err;
    }
    result = JSON.parse(result);
    result.schedules = schedules;
    result.pausedSchedules = pausedSchedules;
    return Promise.resolve(result);
  },
);
