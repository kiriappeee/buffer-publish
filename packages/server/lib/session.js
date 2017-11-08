const RPCClient = require('micro-rpc-client');

const COOKIE_NAME = 'session';
  // isDevelopment ?
  // 'buffer-session-2-local' :
  // 'buffer-session-2';
const client = new RPCClient({
  url: `http://${process.env.SESSION_SVC_HOST}`,
});

exports = module.exports;

exports.get = sessionCookie =>
  client.call('get', { token: sessionCookie, keys: ['global', 'publish'] });

exports.getCookie = req => req.cookies[COOKIE_NAME];

exports.middleware = (req, res, next) => {
  const sessionCookie = exports.getCookie(req);
  if (!sessionCookie) {
    return next();
  }

  exports.get(sessionCookie)
    .then((session) => {
      if (session && session.publish) {
        req.session = session.publish;
      }
      next();
    })
    .catch(next);
};
