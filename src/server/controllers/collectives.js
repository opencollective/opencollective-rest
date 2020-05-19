import gql from 'graphql-tag';
import { get, isEmpty, pick } from 'lodash';

import { fetchCollective, graphqlRequest } from '../lib/graphql';
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

export async function hosted(req, res) {
  const { slug } = req.params;

  const headers = {};
  if (req.headers.authorization) {
    res.setHeader('cache-control', 'no-cache'); // don't cache at CDN level as the result contains private information
    headers.authorization = req.headers.authorization;
  }

  const query = gql`
    query fetchHostedCollectives($slug: String, $limit: Int) {
      host(slug: $slug) {
        memberOf(role: HOST, limit: $limit, accountType: COLLECTIVE) {
          nodes {
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
                isActive
                stats {
                  balance {
                    value
                  }
                  yearlyBudget {
                    value
                  }
                }
              }
              members(role: ADMIN) {
                nodes {
                  role
                  account {
                    ... on Individual {
                      email
                      name
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

  const vars = { slug: slug };
  if (req.params.limit) vars.limit = req.params.limit;

  try {
    const response = await graphqlRequest(query, vars, { version: 'v2', headers });
    const hostedCollectives = get(response, 'host.memberOf.nodes');
    if (isEmpty(hostedCollectives)) {
      res.json([]);
      return;
    }

    const data = hostedCollectives.map(collective => {
      const { account } = collective;
      const result = {
        ...pick(account, ['name', 'currency', 'description', 'updatedAt', 'approvedAt', 'totalFinancialContributors']),
        isActive: String(get(account, 'isActive')),
        isArchived: String(get(account, 'isArchived')),
        balance: get(account, 'stats.balance.value'),
        yearlyBudget: get(account, 'stats.yearlyBudget.value'),
        adminNames: [],
        adminEmails: [],
      };

      const slug = get(account, 'slug');
      result.url = `https://opencollective.com/${slug}`;

      const members = get(account, 'members.nodes', []);
      if (isEmpty(members)) {
        return result;
      }

      for (const member of members) {
        const {
          account: { name, email },
        } = member;

        result.adminNames.push(name);
        result.adminEmails.push(email);
      }
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
