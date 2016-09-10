const webpack = require('webpack');
const baseConfig = require('./webpack.config');

const config = Object.create(baseConfig);
config.debug = true;

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './client/app.js'
];

config.output.publicPath = 'http://localhost:3000/dist/';

config.module.loaders.push({
  test: /\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
);

module.exports = config;
