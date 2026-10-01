import '../env';
import './lib/sentry';

import app from './app';
import { HandlerType, reportErrorToSentry } from './lib/sentry';
import { logger } from './logger';

const port = process.env.PORT || 3003;

const server = app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  logger.info(`Ready on http://localhost:${port}`);
});

server.on('error', (error) => {
  logger.error('Failed to start Express server', error);
  reportErrorToSentry(error, { handler: HandlerType.FALLBACK, severity: 'fatal' });
});
