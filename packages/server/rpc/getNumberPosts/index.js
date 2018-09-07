const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'getNumberOfPosts',
  'fetch number posts',
  ({ profileId, startDate, endDate }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/i/profiles/${profileId}/updates/count_per_day.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        date_string: true,
        since: startDate,
        until: endDate,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => ({
        numberOfPostsByDate: parsedResult,
      }))
);
