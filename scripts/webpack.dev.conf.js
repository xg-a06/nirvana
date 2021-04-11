// const fs = require('fs');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const formatter = require('eslint-friendly-formatter');
const config = require('./config');
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
        include: [resolve('packages'), resolve('examples')],
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.NODE_ENV].API_PATH),
        ENTRIES: JSON.stringify(entries),
      },
    }),
    ...htmlPlugins,
  ],
  devServer,
};

module.exports = merge(baseConfig, devConfig);
