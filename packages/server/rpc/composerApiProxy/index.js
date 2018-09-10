const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'composerApiProxy',
  'communicate with buffer api',
  async ({ url, args }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}${url}`,
        method: 'POST',
        strictSSL: process.env.NODE_ENV !== 'development',
        form: Object.assign(args, {
          access_token: session.publish.accessToken,
        }),
      });
    } catch (err) {
      if (err.error) {
        // debugger;
        // Catch and pass through Buffer API errors
        return Promise.resolve(JSON.parse(err.error));
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  },
);
