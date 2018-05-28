const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const PostCSSImport = require('postcss-import');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSSCalc = require('postcss-calc');
const PostCSSColorFunction = require('postcss-color-function');


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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions'],
              },
              plugins: () => [
                'autoprefixer',
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/performance-tracking)(?!\/@bufferapp\/async-data-fetch)(?!\/@bufferapp\/components)(?!\/@bufferapp\/web-components)(?!\/@bufferapp\/composer)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            'transform-object-assign',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        // PostCSS plugins
        // Note: CSS preprocessing comes with limitations, and generally only applies to
        // what can be determined or calculated ahead of time (e.g. what isn't dependent
        // on the DOM or page's dimensions)
        postcss: [
          PostCSSImport, // Allows @import 'file.css' to be inlined
          PostCSSCustomProperties, // Convert W3C CSS Custom Props to more compatible CSS
          PostCSSCalc, // Convert W3C calc function to more compatible CSS
          PostCSSColorFunction, // Convert W3C color function to more compatible CSS
        ],
      },
    }),

    // Output CSS to a separate, CSS-only bundle
    // TODO: don't hardcode css bundle name if we want to start using css modules in other pkgs
    new MiniCssExtractPlugin('composer-bundle.css'),

    // Further optimize CSS once it's been extracted and put in a single bundle
    // by MiniCssExtractPlugin – essentially deduplicate classes that are imported
    // from different files.
    new OptimizeCssAssets({
      canPrint: false,
      // this is needed because of a bug with cssnano https://github.com/ben-eb/gulp-cssnano/issues/14
      cssProcessorOptions: { zindex: false },
    }),
  ],
  stats: {
    children: false, // Disable logging from child plugins
  },
};
