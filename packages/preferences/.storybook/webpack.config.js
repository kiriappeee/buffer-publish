const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ].join('!')),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/*)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('composer-bundle.css'),
  ]
};
