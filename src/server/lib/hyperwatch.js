import hyperwatch from '@hyperwatch/hyperwatch';
import expressBasicAuth from 'express-basic-auth';

import { logger } from '../logger';

import { parseToBooleanDefaultFalse } from './utils';

const {
  HYPERWATCH_ENABLED: enabled,
  HYPERWATCH_PATH: path,
  HYPERWATCH_USERNAME: username,
  HYPERWATCH_SECRET: secret,
} = process.env;

/**
 * @param {import('express').Application} app
 * @param {import('http').Server} server The HTTP server of the app, needed to serve the Hyperwatch WebSocket streams
 */
export function load(app, server) {
  const { input, lib, modules, pipeline } = hyperwatch;

  // Init
  hyperwatch.init({
    modules: {
      // Expose the status page
      status: { active: true },
      // Expose logs (HTTP and Websocket)
      logs: { active: true },
    },
  });

  // Mount Hyperwatch API and WebSocket streams
  if (parseToBooleanDefaultFalse(enabled) && secret) {
    const hyperwatchBasicAuth = expressBasicAuth({
      users: { [username || 'opencollective']: secret },
      challenge: true,
    });
    hyperwatch.app.mount(app, {
      server,
      path: path || '/_hyperwatch',
      // The WebSocket upgrades go through the app like HTTP requests, so basic auth applies to both
      middleware: hyperwatchBasicAuth,
      // No fallback: Hyperwatch answers 404 to the upgrades it doesn't own, as we serve no other WebSocket
    });
  }

  // Configure input

  const expressInput = input.express.create();

  app.use(expressInput.middleware());

  pipeline.registerInput(expressInput);

  // Configure access Logs in dev and production

  const consoleLogOutput = process.env.NODE_ENV === 'development' ? 'console' : 'text';
  pipeline.map((log) => logger.info(lib.logger.defaultFormatter.format(log, consoleLogOutput)));

  // Start

  modules.start();

  pipeline.start();
}

export default load;
