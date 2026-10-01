import '../env';

import http from 'http';

import cookieParser from 'cookie-parser';
import express from 'express';

import hyperwatch from './lib/hyperwatch';
import { isAuthenticatedRequest, parseToBooleanDefaultFalse } from './lib/utils';
import cloudflareIps from './cloudflare-ips.json';
import { loggerMiddleware } from './logger';
import { loadRoutes } from './routes';

const app = express();

// Created here rather than with `app.listen()` so Hyperwatch can handle WebSocket upgrades on it
export const server = http.createServer(app);

// Preserve structured query filters (e.g. manualPaymentProvider[0][id]) from Express 4.
app.set('query parser', 'extended');
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'].concat(cloudflareIps));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

if (parseToBooleanDefaultFalse(process.env.HYPERWATCH_ENABLED)) {
  hyperwatch(app, server);
}

app.use(loggerMiddleware.logger);
app.use(loggerMiddleware.errorLogger);

// Global caching strategy
app.use((req, res, next) => {
  if (isAuthenticatedRequest(req)) {
    // Make sure authenticated requests are never cached
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Vary', 'Accept-Encoding, Authorization, Personal-Token, Api-Key, Cookie');
  }

  next();
});

loadRoutes(app);

export default app;
