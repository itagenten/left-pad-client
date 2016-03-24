var webpack = require('webpack');
var debug = process.env.NODE_ENV !== 'production';

var config = {
  devtool: 'sourcemap',
  entry:  [
    __dirname + '/index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}
    ]
  }
};

if (!debug) {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
}

module.exports = config;
