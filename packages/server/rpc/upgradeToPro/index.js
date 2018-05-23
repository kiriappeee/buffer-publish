const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'upgradeToPro',
  'upgrade user to the pro plan',
  ({ cycle, token }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/upgrade_to_pro.json`,
      method: 'POST',
      strictSSL: process.env.NODE_ENV !== 'development',
      body: {
        cycle,
        stripeToken: token,
        access_token: session.publish.accessToken,
      },
    })
    .then(result => JSON.parse(result))
    .catch(e => console.log(e)),
);

