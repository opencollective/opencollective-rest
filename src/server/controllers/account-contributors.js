import gqlV2 from 'graphql-tag';
import { Parser } from 'json2csv';
import { difference, get, intersection, pick, trim } from 'lodash';
import moment from 'moment';

import { graphqlRequest } from '../lib/graphql';
import { parseToBooleanDefaultFalse } from '../lib/utils';
import { logger } from '../logger';

function json2csv(data, opts) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

const contributorsQuery = gqlV2/* GraphQL */ `
  query Contributors($slug: String, $limit: Int, $offset: Int) {
    account(slug: $slug) {
      id
      slug
      members(role: BACKER, limit: $limit, offset: $offset) {
        limit
        totalCount
        nodes {
          account {
            name
            slug
            type
            website
            ... on Individual {
              email
            }
            activeRecurringContributions: orders(
              searchTerm: $slug
              onlyActiveSubscriptions: true
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                frequency
                amount {
                  value
                  currency
                }
                tier {
                  slug
                  name
                }
                createdAt
              }
            }
            latestContributions: transactions(
              limit: 1
              kind: CONTRIBUTION
              fromAccount: { slug: $slug }
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              nodes {
                createdAt
              }
            }
            firstContributions: transactions(
              limit: 1
              kind: CONTRIBUTION
              fromAccount: { slug: $slug }
              orderBy: { field: CREATED_AT, direction: ASC }
            ) {
              nodes {
                createdAt
              }
            }
          }
          totalDonations {
            value
            currency
          }
        }
      }
    }
  }
`;

const csvMapping = {
  contributorUrl: (m) => `${process.env.WEBSITE_URL}/${m.account.slug}`,
  contributorName: 'account.name',
  contributorType: 'account.type',
  totalContributions: 'totalDonations.value',
  currency: 'totalDonations.currency',
  activeRecurringContribution: (m) => (m.account.activeRecurringContributions.nodes.length ? 'yes' : 'no'),
  activeRecurringContributionTier: (m) => get(m, 'account.activeRecurringContributions.nodes[0].tier.slug'), // Or name?
  activeRecurringContributionAmount: (m) => get(m, 'account.activeRecurringContributions.nodes[0].amount.value'), // Currency?
  activeRecurringContributionFrequency: (m) => get(m, 'account.activeRecurringContributions.nodes[0].frequency'),
  firstContributionDate: (m) =>
    m.account.firstContributions.nodes[0] &&
    moment.utc(m.account.firstContributions.nodes[0].createdAt).format('YYYY-MM-DD'),
  latestContributionDate: (m) =>
    m.account.latestContributions.nodes[0] &&
    moment.utc(m.account.latestContributions.nodes[0].createdAt).format('YYYY-MM-DD'),
  email: 'account.email',
  website: 'account.website',
};

const allFields = Object.keys(csvMapping);

const defaultFields = [
  'contributorUrl',
  'contributorName',
  'contributorType',
  'totalContributions',
  'currency',
  'activeRecurringContribution',
  'activeRecurringContributionTier',
  'activeRecurringContributionAmount',
  'activeRecurringContributionFrequency',
  'firstContributionDate',
  'latestContributionDate',
  'email',
  'website',
];

const applyMapping = (mapping, row) => {
  const res = {};
  Object.keys(mapping).map((key) => {
    const val = mapping[key];
    if (typeof val === 'function') {
      return (res[key] = val(row));
    } else {
      return (res[key] = get(row, val));
    }
  });
  return res;
};

const accountContributors = async (req, res) => {
  if (!['HEAD', 'GET'].includes(req.method)) {
    return res.status(405).send({ error: { message: 'Method not allowed' } });
  }

  const variables = pick({ ...req.params, ...req.query }, ['slug', 'limit', 'offset']);
  variables.limit =
    // If HEAD, we only want count, so we set limit to 0
    req.method === 'HEAD'
      ? 0
      : // Else, we use the limit provided by the user, or default to 1000
        variables.limit
        ? Number(variables.limit)
        : 1000;
  variables.offset = Number(variables.offset) || 0;

  let fields = get(req.query, 'fields', '')
    .split(',')
    .map(trim)
    .filter((v) => !!v);

  if (fields.length === 0) {
    const remove = get(req.query, 'remove', '')
      .split(',')
      .map(trim)
      .filter((v) => !!v);

    const add = get(req.query, 'add', '')
      .split(',')
      .map(trim)
      .filter((v) => !!v);

    fields = difference(intersection(allFields, [...defaultFields, ...add]), remove);
  }

  const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll);

  try {
    // Forward Api Key or Authorization header
    const headers = {};
    const apiKey = req.get('Api-Key') || req.query.apiKey;
    const personalToken = req.get('Personal-Token') || req.query.personalToken;
    // Support Cookies for direct-download capability
    const authorization = req.get('Authorization') || req.cookies?.authorization;

    if (authorization) {
      headers['Authorization'] = authorization;
    } else if (apiKey) {
      headers['Api-Key'] = apiKey;
    } else if (personalToken) {
      headers['Personal-Token'] = personalToken;
    }

    let result = await graphqlRequest(contributorsQuery, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'txt':
      case 'csv': {
        if (req.params.format === 'csv') {
          res.append('Content-Type', `text/csv;charset=utf-8`);
        } else {
          res.append('Content-Type', `text/plain;charset=utf-8`);
        }
        let filename = `${variables.slug}-contributors`;
        filename += `.${req.params.format}`;
        res.append('Content-Disposition', `attachment; filename="${filename}"`);
        res.append('Access-Control-Expose-Headers', 'X-Exported-Rows');
        res.append('X-Exported-Rows', result.account.members.totalCount);
        if (req.method === 'HEAD') {
          return res.status(200).end();
        }

        if (result.account.members.totalCount === 0) {
          res.status(404).send('No transaction found.');
          break;
        }

        const mapping = pick(csvMapping, fields);

        const mappedResults = result.account.members.nodes.map((t) => applyMapping(mapping, t));
        res.write(json2csv(mappedResults));
        res.write(`\n`);

        if (result.account.members.totalCount > result.account.members.limit) {
          if (fetchAll) {
            do {
              variables.offset += result.account.members.limit;

              result = await graphqlRequest(contributorsQuery, variables, { version: 'v2', headers });

              const mappedResults = result.account.members.nodes.map((t) => applyMapping(mapping, t));
              res.write(json2csv(mappedResults, { header: false }));
              res.write(`\n`);
            } while (result.account.members.totalCount > result.account.members.limit + result.account.members.offset);
          } else {
            res.write(
              `Warning: totalCount is ${result.account.members.totalCount} and limit was ${result.account.members.limit}`,
            );
          }
        }
        res.end();
        break;
      }

      default:
        res.send(result.account.members);
        break;
    }
  } catch (err) {
    if (err.message.match(/No account found/)) {
      return res.status(404).send('Not account found.');
    }
    logger.error(`Error while fetching account contributors: ${err.message}`);
    res.status(400).send(`Error while fetching account contributors.`);
  }
};

export default accountContributors;
