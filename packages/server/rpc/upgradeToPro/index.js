const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'upgradeToPro',
  'upgrade user to the pro plan',
  async ({ cycle, next, token }, { session }) =>
    rp({
      uri: `https://local.buffer.com/pro.json`,
      method: 'POST',
      strictSSL: process.env.NODE_ENV !== 'development',
      body: {
        cycle,
        next,
        stripeToken: token,
        access_token: session.publish.accessToken,
      },
      form: {
        cycle,
        next,
        stripeToken: token,
        access_token: session.publish.accessToken,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(e => console.log(e)),
);

