/* eslint-disable no-param-reassign */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

const isProd = process.env.NODE_ENV === 'production';

function getEntries() {
  const indexs = glob('examples/*/index.ts', { sync: true });
  const htmlPlugins = [
    // new HtmlWebpackPlugin({
    //   template: resolve('demo/index.html'),
    //   filename: 'demo/index.html',
    //   inject: 'body',
    //   minify: true,
    //   chunks: ['demo/index'],
    // }),
  ];
  const entries = indexs.reduce((ret, file) => {
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
  }, {});
  return { entries, htmlPlugins };
}

module.exports = {
  resolve,
  isProd,
  getEntries,
};
