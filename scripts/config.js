const { resolve } = require('./tools');

const config = {
  buildDetail: false,
  devServer: {
    contentBase: 'asd',
    port: 2344,
    open: true,
    hot: true,
    host: '0.0.0.0',
    index: 'index.html',
    overlay: {
      errors: true,
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/examples/index.html' }],
      disableDotRule: true,
    },
    proxy: {
      '/xxx': {
        target: 'http://xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/xxx': '/',
        },
      },
    },
  },
  development: {
    API_PATH: '/api',
  },
  production: {
    API_PATH: '/api',
  },
};
module.exports = config;
