const webpack = require('../node_modules/@storybook/core/node_modules/webpack');

module.exports = {
  plugins: [new webpack.DefinePlugin({
    __PACKAGES__: JSON.stringify(`../packages/${process.env.PACKAGE || ''}`)
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/performance-tracking)(?!\/@bufferapp\/async-data-fetch)(?!\/@bufferapp\/components)(?!\/@bufferapp\/web-components)(?!\/@bufferapp\/composer)(?!\/@bufferapp\/unauthorized-redirect)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
