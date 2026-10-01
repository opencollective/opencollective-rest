import '../env';

import { server } from './app';
import { logger } from './logger';

const port = process.env.PORT || 3003;

server.listen(port, () => {
  logger.info(`Ready on http://localhost:${port}`);
});
