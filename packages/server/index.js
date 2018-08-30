const http = require('http');
const express = require('express');
const logMiddleware = require('@bufferapp/logger/middleware');
const bugsnag = require('bugsnag');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const { join } = require('path');
const shutdownHelper = require('@bufferapp/shutdown-helper');
const { apiError } = require('./middleware');
const {
  setRequestSessionMiddleware,
  validateSessionMiddleware,
} = require('@bufferapp/session-manager');
const bufferMetricsMiddleware = require('@bufferapp/buffermetrics/middleware');
const controller = require('./lib/controller');
const rpc = require('./rpc');
const pusher = require('./lib/pusher');

const app = express();
const server = http.createServer(app);

let staticAssets = {
  'bundle.js': 'https://local.buffer.com:8080/static/bundle.js',
  'bundle.css': 'https://local.buffer.com:8080/static/bundle.css',
  'vendor.js': 'https://local.buffer.com:8080/static/vendor.js',
  'vendor.css': 'https://local.buffer.com:8080/static/vendor.css',
};

// NOTE: Bugsnag will not notify in local setup with current weback configuration
// https://docs.bugsnag.com/platforms/browsers/faq/#4-code-generated-with-eval-e-g-from-webpack
let bugsnagScript = '';

const isProduction = process.env.NODE_ENV === 'production';
app.set('isProduction', isProduction);

if (isProduction) {
  staticAssets = JSON.parse(fs.readFileSync(join(__dirname, 'staticAssets.json'), 'utf8'));
  if (process.env.BUGSNAG_KEY) {
    bugsnag.register(process.env.BUGSNAG_KEY);
    app.set('bugsnag', bugsnag);
    // NOTE: Bugsnag will not notify in local setup with current weback configuration
    // https://docs.bugsnag.com/platforms/browsers/faq/#4-code-generated-with-eval-e-g-from-webpack
    bugsnagScript = `<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js"
                              data-apikey="${process.env.BUGSNAG_KEY}"></script>`;
  }
}

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE;

const stripeScript = `<script src="https://js.stripe.com/v2/"></script>
<script type="text/javascript">
    Stripe.setPublishableKey('${stripePublishableKey}');
</script>
`;

const getHtml = () =>
  fs
    .readFileSync(join(__dirname, 'index.html'), 'utf8')
    .replace('{{{vendor}}}', staticAssets['vendor.js'])
    .replace('{{{vendor-css}}}', staticAssets['vendor.css'])
    .replace('{{{bundle}}}', staticAssets['bundle.js'])
    .replace('{{{bundle-css}}}', staticAssets['bundle.css'])
    .replace('{{{stripeScript}}}', stripeScript)
    .replace('{{{bugsnagScript}}}', bugsnagScript);

app.use(logMiddleware({ name: 'BufferPublish' }));
app.use(cookieParser());

// All routes after this have access to the user session
app.use(
  setRequestSessionMiddleware({
    production: isProduction,
    sessionKeys: ['publish', 'global'],
  }),
);

app.post('/rpc', (req, res, next) => {
  rpc(req, res)
    // catch any unexpected errors
    .catch((err) => {
      if (err.statusCode !== 500) {
        next({
          httpCode: err.statusCode,
          error: err.message,
        });
      } else {
        next(err);
      }
    });
});

app.use(bodyParser.json());
app.use(
  bufferMetricsMiddleware({
    name: 'Buffer-Publish',
    debug: !isProduction,
    trackVisits: true,
  }),
);

// make sure we have a valid session
app.use(
  validateSessionMiddleware({
    production: isProduction,
    requiredSessionKeys: ['publish.accessToken', 'global.userId'],
  }),
);

app.get('/health-check', controller.healthCheck);

// Pusher Auth
app.post(
  '/pusher/auth',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  },
);

app.get('*', (req, res) => res.send(getHtml()));

app.use(apiError);

server.listen(80, () => console.log('listening on port 80')); // eslint-disable-line

shutdownHelper.init({ server });
