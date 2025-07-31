import '../env';

import app from './app';
import { logger } from './logger';

const port = process.env.PORT || 3003;

app.listen(port, () => {
  logger.info(`Ready on http://localhost:${port}`);
});
