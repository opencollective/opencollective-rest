import type { NextFunction, Request, Response } from 'express';
import { pick } from 'lodash';

import { fetchCollective } from '../lib/graphql';
import { logger } from '../logger';

type CollectivesParams = Record<string, string> & { collectiveSlug: string };

export async function info(
  req: Request<CollectivesParams>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  // Keeping the resulting image for 1h in the CDN cache (we purge that cache on deploy)
  res.setHeader('Cache-Control', `public, max-age=${60 * 60}`);

  let collective;
  try {
    collective = await fetchCollective(req.params.collectiveSlug);
  } catch (e) {
    if (e.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.debug('>>> collectives.info error', e);
    return next(e);
  }

  // /!\ Do not return any private date in there, or update the cache policy
  const response = {
    ...pick(collective, ['slug', 'currency', 'image']),
    balance: collective.stats.balance,
    yearlyIncome: collective.stats.yearlyBudget,
    backersCount: collective.stats.backers.all,
  };

  res.send(response);
}
