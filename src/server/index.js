import '../env';

import http from 'http';
import express from 'express';
import cloudflareIps from 'cloudflare-ip/ips.json';

import { loadRoutes } from './routes';
import { loggerMiddleware, logger } from './logger';

const port = process.env.PORT || 3003;

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'].concat(cloudflareIps));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
