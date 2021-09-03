import '../env';

import cloudflareIps from 'cloudflare-ip/ips.json';
import express from 'express';

import hyperwatch from './lib/hyperwatch';
import { logger, loggerMiddleware } from './logger';
import { loadRoutes } from './routes';

const port = process.env.PORT || 3003;

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'].concat(cloudflareIps));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

hyperwatch(app);

app.use(loggerMiddleware.logger);
app.use(loggerMiddleware.errorLogger);

loadRoutes(app);

app.listen(port, () => {
  logger.info(`Ready on http://localhost:${port}`);
});
