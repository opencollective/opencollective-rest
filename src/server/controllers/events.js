import { fetchEvent } from '../lib/graphql';
import { validateParams } from '../lib/utils';
import { logger } from '../logger';

export async function info(req, res, next) {
  const paramsError = validateParams(req.params, {
    format: ['json'],
  });
  if (paramsError) {
    return next();
  }

  // Keeping the resulting info for 10m in the CDN cache
  res.setHeader('Cache-Control', `public, max-age=${60 * 10}`);
  let event;
  try {
    logger.debug('>>> events.info fetching: %s', req.params.eventSlug);
    event = await fetchEvent(req.params.eventSlug);
    event.url = `https://opencollective.com/${req.params.collectiveSlug}/events/${event.slug}`;
    event.attendees = `https://opencollective.com/${req.params.collectiveSlug}/events/${event.slug}/attendees.json`;
    logger.debug('>>> events.info event: %j', event);
    res.send(event);
  } catch (e) {
    if (e.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.debug('>>> events.info error', e);
    return next(e);
  }
}
