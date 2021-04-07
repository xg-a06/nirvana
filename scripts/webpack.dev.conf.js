const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const formatter = require('eslint-friendly-formatter');
const { devServer } = require('./config');
const { getEntries } = require('./tools');
const { resolve } = require('./tools');
const baseConfig = require('./webpack.base.conf');

const { entries, htmlPlugins } = getEntries();

const devConfig = {
  entry: {
    ...entries,
  },
  module: {
    rules: [
      {
        test: /\.[t|j]s?$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter,
          },
        },
        include: [resolve('src')],
        enforce: 'pre',
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin(), ...htmlPlugins],
  devServer,
};

module.exports = merge(baseConfig, devConfig);
