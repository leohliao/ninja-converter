const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('setting proxy....')
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
