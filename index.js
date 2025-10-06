import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Proxy route: /proxy/* -> gerçek SceneLayer sunucusu
app.use('/proxy', createProxyMiddleware({
  target: 'https://cbsapi.ibb.gov.tr', // gerçek ArcGIS sunucusu
  changeOrigin: true,
  secure: true,
  pathRewrite: (path, req) => {
    // /proxy/GW/server-Blok_57/SceneServer -> /GW/server-Blok_57/SceneServer
    return path.replace(/^\/proxy/, '');
  },
  onProxyReq: (proxyReq, req, res) => {
    // Authorization header ekle
    proxyReq.setHeader('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
  }
}));

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
