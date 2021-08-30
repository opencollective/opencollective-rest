import cors from 'cors';

import { idOrUuid } from './lib/utils';
import controllers from './controllers';

const requireApiKey = (req, res, next) => {
  req.apiKey = req.get('Api-Key') || req.query.apiKey;
  next();
};

export const loadRoutes = (app) => {
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

  app.get('/:version(v1)?/:collectiveSlug.:format(json)', controllers.collectives.info);
  app.get('/:version(v1)?/:collectiveSlug/members.:format(json|csv)', controllers.members.list);
  app.get(
    '/:version(v1)?/:collectiveSlug/members/:backerType(all|users|organizations).:format(json|csv)',
    controllers.members.list,
  );
  app.get(
    '/:version(v1)?/:collectiveSlug/tiers/:tierSlug/:backerType(all|users|organizations).:format(json|csv)',
    controllers.members.list,
  );

  app.get('/:version(v1)?/:collectiveSlug/events.:format(json)', controllers.events.list);
  app.get('/:version(v1)?/:collectiveSlug/events/:eventSlug.:format(json)', controllers.events.info);
  app.get(
    '/:version(v1)?/:collectiveSlug/events/:eventSlug/:role(attendees|followers|organizers|all).:format(json|csv)',
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
    '/v2/:slug/tier/:tierSlug/orders/:filter(incoming)?/:status(active|cancelled|error|paid|pending)?',
    controllers.accountOrders,
  );

  app.get(
    '/v2/:slug/orders/:filter(incoming|outgoing)?/:status(active|cancelled|error|paid|pending)?',
    controllers.accountOrders,
  );

  app.get(
    '/v2/:slug/transactions/:type(credit|debit)?/:kind(contribution|expense|added_funds|host_fee|host_fee_share|host_fee_share_debt|platform_tip|platform_tip_debt)?.:format(json|csv|txt)',
    controllers.accountTransactions,
  );
};
