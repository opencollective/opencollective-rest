import '../env';
import './lib/sentry';

import { HandlerType, reportErrorToSentry } from './lib/sentry';
import { server } from './app';
import { logger } from './logger';

const port = process.env.PORT || 3003;

server.listen(port, () => {
  logger.info(`Ready on http://localhost:${port}`);
});

server.on('error', (error) => {
  logger.error('Failed to start Express server', error);
  reportErrorToSentry(error, { handler: HandlerType.FALLBACK, severity: 'fatal' });
});
