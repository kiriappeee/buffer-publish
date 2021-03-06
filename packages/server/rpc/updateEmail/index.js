const { method, createError } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'updateEmail',
  'update the user email',
  async ({ email }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/user/update.json`,
        method: 'POST',
        json: true,
        strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
        form: {
          access_token: session.publish.accessToken,
          email,
        },
      });
    } catch (err) {
      if (err.error) {
        const { error } = err.error;
        throw createError({
          message: error,
        });
      }
      throw err;
    }
    return Promise.resolve(result);
  },
);

