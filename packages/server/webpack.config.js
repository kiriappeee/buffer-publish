module.exports = {
  context: __dirname,
  entry: [
    '../web/index.jsx',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'https://local.buffer.com:8080/static/',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      moment$: 'moment/moment.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/components)(?!\/@bufferapp\/web-components)(?!\/@bufferapp\/composer)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            'transform-object-assign',
            'add-module-exports',
          ],
        },
      },
    ],
  },
};
