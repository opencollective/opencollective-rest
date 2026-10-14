import cors from 'cors';
import type { Express } from 'express';

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

  // RegExp routes retain the constrained optional params supported by Express 4.
  // Named groups populate req.params; /i and /? preserve case and trailing-slash behavior.
  app.get(/^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\.(?<format>json)\/?$/i, controllers.collectives.info);
  app.get(
    /^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\/members\.(?<format>json|csv)\/?$/i,
    controllers.members.list,
  );
  app.get(
    /^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\/members\/(?<backerType>all|users|organizations)\.(?<format>json|csv)\/?$/i,
    controllers.members.list,
  );
  app.get(
    /^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\/tiers\/(?<tierSlug>[^/]+?)\/(?<backerType>all|users|organizations)\.(?<format>json|csv)\/?$/i,
    controllers.members.list,
  );

  app.get(
    /^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\/events\/(?<eventSlug>[^/]+?)\.(?<format>json)\/?$/i,
    controllers.events.info,
  );
  app.get(
    /^(?:\/(?<version>v1))?\/(?<collectiveSlug>[^/]+?)\/events\/(?<eventSlug>[^/]+?)\/(?<role>attendees|organizers|all)\.(?<format>json|csv)\/?$/i,
    controllers.members.list,
  );

  /* API v1 */

  // Get transactions of a collective given its slug.
  app.get('/v1/collectives/:collectiveSlug/transactions', requireApiKey, controllers.transactions.allTransactions);

  /* API v2 */

  app.get(
    /^\/v2\/(?<slug>[^/]+?)\/tier\/(?<tierSlug>[^/]+?)\/orders(?:\/(?<filter>incoming))?(?:\/(?<status>active|cancelled|error|paid|pending))?\/?$/i,
    controllers.accountOrders,
  );

  app.get(
    /^\/v2\/(?<slug>[^/]+?)\/orders(?:\/(?<filter>incoming|outgoing))?(?:\/(?<status>active|cancelled|error|paid|pending))?\/?$/i,
    controllers.accountOrders,
  );

  app.all(
    /^\/v2\/(?<slug>[^/]+?)\/(?<reportType>hostTransactions|transactions)(?:\/(?<type>credit|debit))?(?:\/(?<kind>contribution|expense|added_funds|host_fee|host_fee_share|host_fee_share_debt|platform_tip|platform_tip_debt))?\.(?<format>json|csv|txt)\/?$/i,
    controllers.accountTransactions,
  );

  app.get(/^\/v2\/(?<slug>[^/]+?)\/contributors\.(?<format>json|csv)\/?$/i, controllers.accountContributors);

  app.all(/^\/v2\/(?<slug>[^/]+?)\/hosted-collectives\.(?<format>json|csv)\/?$/i, controllers.hostedCollectives);
};
