const webpack = require('webpack');
const config = require('./webpack.config');
const fs = require('fs');

// NOTE: Bugsnag will not notify in local setup with current weback configuration
// https://docs.bugsnag.com/platforms/browsers/faq/#4-code-generated-with-eval-e-g-from-webpack
config.devtool = 'cheap-module-eval-source-map';

config.entry.unshift(
  'react-hot-loader/patch',
  // 'webpack-hot-middleware/client',
);

config.devServer = {
  hot: true,
  publicPath: config.output.publicPath,
  contentBase: false,
  port: 8080,
  host: 'local.buffer.com',
  headers: { 'Access-Control-Allow-Origin': '*' },
  https: {
    key: fs.readFileSync('../reverseproxy/certs/local.buffer.com-wildcard.key'),
    cert: fs.readFileSync('../reverseproxy/certs/local.buffer.com-wildcard.crt'),
  },
};

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
);

module.exports = config;
