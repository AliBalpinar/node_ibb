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
      proxyReq.setHeader('Authorization', 'Bearer aaaaaac4-335d-4737-a747-6697dcac9e56');
    }
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
