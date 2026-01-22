import cors from 'cors';
import type { Express, RequestHandler } from 'express';

import { idOrUuid } from './lib/utils';
import controllers from './controllers';

const requireApiKey: RequestHandler = (req, res, next) => {
  req.apiKey = req.get('Personal-Token') || req.query.personalToken || req.get('Api-Key') || req.query.apiKey;
  next();
};

// Validation middleware for route parameters
const validateVersion: RequestHandler = (req, res, next) => {
  if (req.params.version && req.params.version !== 'v1') {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateFormat =
  (allowedFormats: string[]): RequestHandler =>
  (req, res, next) => {
    if (!allowedFormats.includes(req.params.format)) {
      return res.status(404).send('Not Found');
    }
    next();
  };

const validateBackerType: RequestHandler = (req, res, next) => {
  const allowed = ['all', 'users', 'organizations'];
  if (!allowed.includes(req.params.backerType)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateRole: RequestHandler = (req, res, next) => {
  const allowed = ['attendees', 'followers', 'organizers', 'all'];
  if (!allowed.includes(req.params.role)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateOrderFilter: RequestHandler = (req, res, next) => {
  const allowed = ['incoming', 'outgoing'];
  if (req.params.filter && !allowed.includes(req.params.filter)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateOrderStatus: RequestHandler = (req, res, next) => {
  const allowed = ['active', 'cancelled', 'error', 'paid', 'pending'];
  if (req.params.status && !allowed.includes(req.params.status)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateReportType: RequestHandler = (req, res, next) => {
  const allowed = ['hostTransactions', 'transactions'];
  if (!allowed.includes(req.params.reportType)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateTransactionType: RequestHandler = (req, res, next) => {
  const allowed = ['credit', 'debit'];
  if (req.params.type && !allowed.includes(req.params.type)) {
    return res.status(404).send('Not Found');
  }
  next();
};

const validateTransactionKind: RequestHandler = (req, res, next) => {
  const allowed = [
    'contribution',
    'expense',
    'added_funds',
    'host_fee',
    'host_fee_share',
    'host_fee_share_debt',
    'platform_tip',
    'platform_tip_debt',
  ];
  if (req.params.kind && !allowed.includes(req.params.kind)) {
    return res.status(404).send('Not Found');
  }
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

  // Routes ordered by specificity: more literal segments first, then param-only routes
  // 4-segment routes with literals
  app.get(
    '/:version/:collectiveSlug/events/:eventSlug/:role.:format',
    validateVersion,
    validateRole,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );
  app.get(
    '/:collectiveSlug/events/:eventSlug/:role.:format',
    validateRole,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );
  app.get(
    '/:version/:collectiveSlug/tiers/:tierSlug/:backerType.:format',
    validateVersion,
    validateBackerType,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );
  app.get(
    '/:collectiveSlug/tiers/:tierSlug/:backerType.:format',
    validateBackerType,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );

  // 3-segment routes with literals
  app.get(
    '/:version/:collectiveSlug/members/:backerType.:format',
    validateVersion,
    validateBackerType,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );
  app.get(
    '/:collectiveSlug/members/:backerType.:format',
    validateBackerType,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );
  app.get(
    '/:version/:collectiveSlug/events/:eventSlug.:format',
    validateVersion,
    validateFormat(['json']),
    controllers.events.info,
  );
  app.get('/:collectiveSlug/events/:eventSlug.:format', validateFormat(['json']), controllers.events.info);
  app.get(
    '/:version/:collectiveSlug/members.:format',
    validateVersion,
    validateFormat(['json', 'csv']),
    controllers.members.list,
  );

  // 2-segment routes with literal in segment 2 (must come before param-only 2-segment routes)
  app.get('/:collectiveSlug/members.:format', validateFormat(['json', 'csv']), controllers.members.list);

  // 2-segment routes with params only
  app.get('/:version/:collectiveSlug.:format', validateVersion, validateFormat(['json']), controllers.collectives.info);

  // 1-segment routes
  app.get('/:collectiveSlug.:format', validateFormat(['json']), controllers.collectives.info);

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

  // Orders with tier
  app.get('/v2/:slug/tier/:tierSlug/orders', controllers.accountOrders);
  app.get(
    '/v2/:slug/tier/:tierSlug/orders/:filter',
    validateOrderFilter,
    controllers.accountOrders,
  );
  app.get(
    '/v2/:slug/tier/:tierSlug/orders/:filter/:status',
    validateOrderFilter,
    validateOrderStatus,
    controllers.accountOrders,
  );

  // Orders without tier
  app.get('/v2/:slug/orders', controllers.accountOrders);
  app.get('/v2/:slug/orders/:filter', validateOrderFilter, controllers.accountOrders);
  app.get('/v2/:slug/orders/:filter/:status', validateOrderFilter, validateOrderStatus, controllers.accountOrders);

  // Contributors and hosted-collectives (must come before generic :reportType routes)
  app.get('/v2/:slug/contributors.:format', validateFormat(['json', 'csv']), controllers.accountContributors);
  app.all('/v2/:slug/hosted-collectives.:format', validateFormat(['json', 'csv']), controllers.hostedCollectives);

  // Transactions (generic :reportType routes last)
  app.all(
    '/v2/:slug/:reportType.:format',
    validateReportType,
    validateFormat(['json', 'csv', 'txt']),
    controllers.accountTransactions,
  );
  app.all(
    '/v2/:slug/:reportType/:type.:format',
    validateReportType,
    validateTransactionType,
    validateFormat(['json', 'csv', 'txt']),
    controllers.accountTransactions,
  );
  app.all(
    '/v2/:slug/:reportType/:type/:kind.:format',
    validateReportType,
    validateTransactionType,
    validateTransactionKind,
    validateFormat(['json', 'csv', 'txt']),
    controllers.accountTransactions,
  );
};
