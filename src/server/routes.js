import controllers from './controllers';

export const loadRoutes = app => {
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
};
