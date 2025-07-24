import '../env';

import cloudflareIps from 'cloudflare-ip/ips.json';
import cookieParser from 'cookie-parser';
import express from 'express';

import hyperwatch from './lib/hyperwatch';
import { parseToBooleanDefaultFalse } from './lib/utils';
import { loggerMiddleware } from './logger';
import { loadRoutes } from './routes';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'].concat(cloudflareIps));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

if (parseToBooleanDefaultFalse(process.env.HYPERWATCH_ENABLED)) {
  hyperwatch(app);
}

app.use(loggerMiddleware.logger);
app.use(loggerMiddleware.errorLogger);

// Global caching strategy
app.use((req, res, next) => {
  if (
    req.get('Authorization') ||
    req.query.apiKey ||
    req.get('Personal-Token') ||
    req.query.personalToken ||
    req.get('Authorization')
  ) {
    // Make sure authenticated requests are never cached
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Vary', 'Accept-Encoding, Authorization, Personal-Token, Api-Key');
  }

  next();
});

loadRoutes(app);

export default app;
