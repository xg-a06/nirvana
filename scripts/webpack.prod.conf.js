const fs = require('fs');
const chalk = require('chalk');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./config');
const { resolve } = require('./tools');
const baseConfig = require('./webpack.base.conf');

const appDirectory = fs.realpathSync(process.cwd());
const paths = appDirectory.split('/');
const libName = paths[paths.length - 1];

const prodConfig = {
  entry: {
    index: resolve('src/index.ts', appDirectory),
  },
  output: {
    filename: `${libName}/index.js`,
    path: resolve(`dist`),
    library: libName,
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {},
          compress: {},
          safari10: true,
        },
        parallel: true,
      }),
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.NODE_ENV].API_PATH),
      },
    }),
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
