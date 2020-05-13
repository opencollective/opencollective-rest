import '../env';

import http from 'http';

import cloudflareIps from 'cloudflare-ip/ips.json';
import express from 'express';

import { logger, loggerMiddleware } from './logger';
import { loadRoutes } from './routes';

const port = process.env.PORT || 3003;

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'].concat(cloudflareIps));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(loggerMiddleware.logger);
app.use(loggerMiddleware.errorLogger);

loadRoutes(app);

const httpServer = http.createServer(app);

httpServer.on('error', err => {
  logger.error(`Can't start server on http://localhost:${port}. %s`, err);
});

httpServer.listen(port, () => {
  logger.info(`Ready on http://localhost:${port}`);
});
