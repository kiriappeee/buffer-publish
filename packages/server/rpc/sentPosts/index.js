const { postParser, date } = require('@bufferapp/publish-utils');
const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const { daysAgoTimestamp } = date;

module.exports = method(
  'sentPosts',
  'fetch sent posts',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/sent.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        page,
        count: 20,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => ({
        total: parsedResult.total,
        updates: parsedResult.updates.map(postParser),
      })),
);
