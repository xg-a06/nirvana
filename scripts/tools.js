/* eslint-disable no-param-reassign */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir, abPath = '..') {
  return path.resolve(__dirname, abPath, dir);
}

const isProd = process.env.NODE_ENV === 'production';

function getEntries() {
  const indexs = glob('examples/*/index.ts', { sync: true });
  const htmlPlugins = [
    new HtmlWebpackPlugin({
      template: resolve('examples/index.html'),
      filename: 'examples/index.html',
      inject: 'body',
      minify: true,
      chunks: ['examples/index'],
    }),
  ];
  const entries = indexs.reduce(
    (ret, file) => {
      const [, entry] = file.split('/');

      ret[`examples/${entry}`] = resolve(file);
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          template: resolve(`examples/${entry}/index.html`),
          filename: `examples/${entry}/index.html`,
          inject: 'body',
          minify: true,
          chunks: [`examples/${entry}`],
        })
      );
      return ret;
    },
    { 'examples/index': resolve('examples/index.ts') }
  );
  return { entries, htmlPlugins };
}

module.exports = {
  resolve,
  isProd,
  getEntries,
};
