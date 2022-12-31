const { createProxyMiddleware } = require('http-proxy-middleware'); // 引入中间件

module.exports = function (app) {
  // 导出
  app.use(
    '/api',
    // 请求路径 以admin开头的进行代理
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      // pathRewrite: {
      //   // 路径重写
      //   '^/api': '',
      // },
    })
  );
};
