const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'upgradeToPro',
  'upgrade user to the pro plan',
  ({ cycle, token }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/billing/start-or-upgrade-subscription.json`,
      method: 'POST',
      strictSSL: process.env.NODE_ENV !== 'development',
      body: {
        cycle,
        stripeToken: token,
        access_token: session.publish.accessToken,
        product: 'publish',
        plan: 'pro',
      },
    })
    .then(result => JSON.parse(result))
    .catch(e => console.log(e)), // eslint-disable-line no-console
);

