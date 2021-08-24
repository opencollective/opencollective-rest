import cors from 'cors';

import { idOrUuid } from './lib/utils';
import controllers from './controllers';

const requireApiKey = (req, res, next) => {
  req.apiKey = req.get('Api-Key') || req.query.apiKey;
  next();
};

export const loadRoutes = (app) => {
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

  app.get('/:version(v1)?/:collectiveSlug.:format(json)', cors(), controllers.collectives.info);
  app.get('/:version(v1)?/:collectiveSlug/members.:format(json|csv)', cors(), controllers.members.list);
  app.get(
    '/:version(v1)?/:collectiveSlug/members/:backerType(all|users|organizations).:format(json|csv)',
    cors(),
    controllers.members.list,
  );
  app.get(
    '/:version(v1)?/:collectiveSlug/tiers/:tierSlug/:backerType(all|users|organizations).:format(json|csv)',
    cors(),
    controllers.members.list,
  );

  app.get('/:version(v1)?/:collectiveSlug/events.:format(json)', cors(), controllers.events.list);
  app.get('/:version(v1)?/:collectiveSlug/events/:eventSlug.:format(json)', cors(), controllers.events.info);
  app.get(
    '/:version(v1)?/:collectiveSlug/events/:eventSlug/:role(attendees|followers|organizers|all).:format(json|csv)',
    cors(),
    controllers.members.list,
  );

  /* API v1 */

  app.param('idOrUuid', idOrUuid);

  // Get transactions of a collective given its slug.
  app.get('/v1/collectives/:collectiveSlug/transactions', cors(), requireApiKey, controllers.transactions.allTransactions);
  app.get(
    '/v1/collectives/:collectiveSlug/transactions/:idOrUuid',
    cors(),
    requireApiKey,
    controllers.transactions.getTransaction,
  );

  /* API v2 */

  app.get(
    '/v2/:slug/tier/:tierSlug/orders/:filter(incoming)?/:status(active|cancelled|error|paid|pending)?',
    cors(),
    controllers.accountOrders,
  );

  app.get(
    '/v2/:slug/orders/:filter(incoming|outgoing)?/:status(active|cancelled|error|paid|pending)?',
    cors(),
    controllers.accountOrders,
  );
};
