const { createProxyMiddleware } = require('http-proxy-middleware');

// Enhanced proxy with debug hooks so we can log what is forwarded and the
// target's response. This helps diagnose why requests through :3000 return 401
// while the backend on :8080 returns 200.
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9080',
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        try {
          console.log(`[proxy] -> ${req.method} ${req.originalUrl} -> ${proxyReq.getHeader('host')}${proxyReq.path || ''}`);
          // Optionally log headers lightly (avoid printing Authorization)
          const headers = Object.assign({}, req.headers);
          if (headers.authorization) headers.authorization = '[REDACTED]';
          console.log('[proxy] request headers:', headers);
        } catch (e) {
          console.error('[proxy] onProxyReq log failed', e && e.message);
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        try {
          console.log(`[proxy] <- response for ${req.method} ${req.originalUrl}: ${proxyRes.statusCode}`);
          // Log a few response headers for debugging
          const interesting = {
            'content-type': proxyRes.headers['content-type'],
            'content-length': proxyRes.headers['content-length'],
            'transfer-encoding': proxyRes.headers['transfer-encoding']
          };
          console.log('[proxy] response headers from target:', interesting);
        } catch (e) {
          console.error('[proxy] onProxyRes log failed', e && e.message);
        }
      },
      onError: (err, req, res) => {
        console.error('[proxy] error when proxying', err && err.message);
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain' });
        }
        try { res.end('Proxy error'); } catch (e) { /* ignore */ }
      }
    })
  );
};
