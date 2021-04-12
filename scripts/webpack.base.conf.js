// const threadLoader = require('thread-loader');

const { resolve, isProd } = require('./tools');
// threadLoader.warmup(
//   {
//     workers: 4,
//   },
//   ['babel-loader', '@babel/preset-env', 'less-loader']
// );
const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[t|j]s?$/,
        // loader: 'babel-loader',
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
            },
          },
          'cache-loader',
          'babel-loader?cacheDirectory=true&rootMode=upward',
        ],
        include: [resolve('packages'), resolve('examples')],
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: true, fallback: false },
        },
        include: [resolve('packages'), resolve('examples')],
      },
    ],
  },
  plugins: [],
};

module.exports = baseConfig;
