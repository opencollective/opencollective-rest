import '../env';
import './lib/sentry';

import http from 'http';

import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import express from 'express';

import hyperwatch from './lib/hyperwatch';
import { HandlerType, isValidDebugSentryKey, reportErrorToSentry } from './lib/sentry';
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

// Debug endpoint to verify Sentry reporting end-to-end. Behaves like an unknown route
// when the shared secret is not configured or does not match.
app.get('/debug-sentry', (req, res, next) => {
  if (!isValidDebugSentryKey(req.query.key)) {
    next();
    return;
  }
  throw new Error('Sentry debug error triggered via /debug-sentry');
});

// Unknown routes are not errors, do not report them to Sentry
app.use((req, res) => {
  res.status(404).send({ error: { message: 'Not found' } });
});

Sentry.setupExpressErrorHandler(app);

// Global fallback error handler. Must be last and use 4 args so Express treats it as an error handler.
// Catches sync throws and errors forwarded with next(err); async rejections that escape Express
// are additionally caught by the process-level handlers in ./lib/sentry.
app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  reportErrorToSentry(err, { handler: HandlerType.EXPRESS, req });
  if (res.headersSent) {
    return next(err);
  }
  const status = Number(err?.status ?? err?.statusCode ?? 500);
  const safeStatus = Number.isInteger(status) && status >= 400 && status < 600 ? status : 500;
  res.status(safeStatus).send({
    error: { message: safeStatus >= 500 ? 'Internal server error' : err?.message || 'Bad request' },
  });
});

export default app;
