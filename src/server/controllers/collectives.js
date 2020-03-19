import { get, isEmpty,pick } from 'lodash';

import { fetchCollective, getClient } from '../lib/graphql';
import { json2csv } from '../lib/utils';
import { logger } from '../logger';

export async function info(req, res, next) {
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

  const response = {
    ...pick(collective, ['slug', 'currency', 'image']),
    balance: collective.stats.balance,
    yearlyIncome: collective.stats.yearlyBudget,
    backersCount: collective.stats.backers.all,
    contributorsCount: Object.keys(get(collective, 'data.githubContributors') || {}).length,
  };

  res.send(response);
}

const query = `
query($slug: String){
  account(slug: $slug) {
    memberOf(role: HOST){
      nodes{
        account {
          ... on Collective {
            name
            slug
            description
            currency
            isArchived
            updatedAt
            approvedAt
            totalFinancialContributors
            stats {
              balance {
                value
              }
              yearlyBudget {
                value
              }
            }
            members(role: ADMIN) {
              nodes {
                account{
                  ... on Individual {
                    name
                    email
                  }
                }
              }
            }
          } 
        }
      }
    }
  }
}
`;

export async function hosted(req, res) {
  try {
    const response = await getClient({ version: 'v2' }).request(query, { slug: req.params.slug });
    const hostedCollectives = get(response, 'account.memberOf.nodes');

    if (isEmpty(hostedCollectives)) {
      res.json([]);
      return;
    }

    const data = hostedCollectives.map(collective => {
      const { account } = collective;
      const result = {
        ...pick(account, [
          'name',
          'currency',
          'description',
          'updatedAt',
          'isArchived',
          'approvedAt',
          'totalFinancialContributors',
        ]),
        balance: get(account, 'stats.balance.value'),
        yearlyBudget: get(account, 'stats.yearlyBudget.value'),
        admins: [],
      };

      const slug = get(account, 'slug');
      result.url = `https://opencollective.com/${slug}`;

      const members = get(account, 'members.nodes', []);
      if (isEmpty(members)) {
        return result;
      }

      result.admins = members.map(member => member.account);

      return result;
    });

    switch (req.params.format) {
      case 'csv': {
        const csv = json2csv(data);
        res.setHeader('content-type', 'text/csv');
        res.send(csv);
        break;
      }
      case 'json':
        res.json(data);
        break;
      default:
        res.end();
        break;
    }
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(`Error while fetching host collectives: ${err.message}`);
    res.status(400).send(`Error while fetching host collectives.`);
  }
}
