const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://cbsapi.ibb.gov.tr',
    changeOrigin: true,
    secure: true,
    onProxyReq: (proxyReq, req, res) => {
      // Authorization header ekle
      proxyReq.setHeader('Authorization', 'Bearer aaaaaa22-40cf-4828-bd4c-98867cc65fd8');
      proxyReq.setHeader('Host', 'cbsapi.ibb.gov.tr');
      proxyReq.setHeader('Origin', 'https://3bistanbul.ibb.gov.tr');
       proxyReq.setHeader('referer', 'https://3bistanbul.ibb.gov.tr/');
    }
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
