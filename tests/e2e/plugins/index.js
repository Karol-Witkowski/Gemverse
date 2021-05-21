const webpack = require('@cypress/webpack-dev-server')
const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
};

const options = {
  webpackOptions,
  watchOptions: {},
};

module.exports = (on) => {
  on('dev-server:start', webpack(options))
};
