import cors from 'cors';
import type { Express } from 'express';

import { idOrUuid } from './lib/utils';
import controllers from './controllers';

const requireApiKey = (req, res, next) => {
  req.apiKey = req.get('Personal-Token') || req.query.personalToken || req.get('Api-Key') || req.query.apiKey;
  next();
};

export const loadRoutes = (app: Express) => {
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('This is the Open Collective REST API.');
  });

  /**
   * Prevent indexation from search engines
   */
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('User-agent: *\nDisallow: /');
  });

  // Express 5: inline regex constraints like :param(regex) and optional ? are no longer supported.
  // Using array-based routes for the optional /v1 prefix, and removing inline regex constraints.
  // Parameter validation (format, backerType, role, etc.) is handled by the controllers.

  app.get(['/v1/:collectiveSlug.:format', '/:collectiveSlug.:format'], controllers.collectives.info);
  app.get(
    ['/v1/:collectiveSlug/members.:format', '/:collectiveSlug/members.:format'],
    controllers.members.list,
  );
  app.get(
    ['/v1/:collectiveSlug/members/:backerType.:format', '/:collectiveSlug/members/:backerType.:format'],
    controllers.members.list,
  );
  app.get(
    [
      '/v1/:collectiveSlug/tiers/:tierSlug/:backerType.:format',
      '/:collectiveSlug/tiers/:tierSlug/:backerType.:format',
    ],
    controllers.members.list,
  );

  app.get(
    ['/v1/:collectiveSlug/events/:eventSlug.:format', '/:collectiveSlug/events/:eventSlug.:format'],
    controllers.events.info,
  );
  app.get(
    [
      '/v1/:collectiveSlug/events/:eventSlug/:role.:format',
      '/:collectiveSlug/events/:eventSlug/:role.:format',
    ],
    controllers.members.list,
  );

  /* API v1 */

  app.param('idOrUuid', idOrUuid);

  // Get transactions of a collective given its slug.
  app.get('/v1/collectives/:collectiveSlug/transactions', requireApiKey, controllers.transactions.allTransactions);
  app.get(
    '/v1/collectives/:collectiveSlug/transactions/:idOrUuid',
    requireApiKey,
    controllers.transactions.getTransaction,
  );

  /* API v2 */

  app.get(
    '/v2/:slug/tier/:tierSlug/orders{/:filter}{/:status}',
    controllers.accountOrders,
  );

  app.get(
    '/v2/:slug/orders{/:filter}{/:status}',
    controllers.accountOrders,
  );

  // Express 5: optional params before .:format require multiple paths
  app.all(
    [
      '/v2/:slug/:reportType.:format',
      '/v2/:slug/:reportType/:type.:format',
      '/v2/:slug/:reportType/:type/:kind.:format',
    ],
    controllers.accountTransactions,
  );

  app.get('/v2/:slug/contributors.:format', controllers.accountContributors);

  app.all('/v2/:slug/hosted-collectives.:format', controllers.hostedCollectives);
};
