import { Parser, type ParserOptions } from '@json2csv/plainjs';
import type { Request, Response } from 'express';
import gql from 'graphql-tag';
import { difference, get, intersection, pick, trim } from 'lodash';
import moment from 'moment';

import type { ContributorsQuery } from '../../graphql/types/v2/graphql';
import { graphqlRequest } from '../lib/graphql';
import { getPage, hasNextPage } from '../lib/pagination';
import { parseToBooleanDefaultFalse, setPrivateCacheHeadersIfAuthenticated } from '../lib/utils';
import { logger } from '../logger';

function json2csv(data: object, opts?: ParserOptions) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

type AccountContributorsParams = Record<string, string> & { slug: string; format?: string };

type AccountContributorsQuery = Record<string, string> & {
  add?: string;
  apiKey?: string;
  fetchAll?: string;
  fields?: string;
  limit?: string;
  offset?: string;
  personalToken?: string;
  remove?: string;
};

type AccountContributorsVariables = {
  slug?: string;
  limit?: number | string;
  offset?: number | string;
};

type ContributorRow = NonNullable<NonNullable<NonNullable<ContributorsQuery['account']>['members']['nodes']>[number]>;

const getContributorsPage = ({ account }: ContributorsQuery) => {
  // Matches the error returned by the API for unknown accounts, handled in the catch block
  if (!account) {
    throw new Error('No account found');
  }
  return getPage<ContributorRow>(account.members);
};

const contributorsQuery = gql`
  query Contributors($slug: String, $limit: Int, $offset: Int) {
    account(slug: $slug) {
      id
      slug
      members(role: [BACKER, ATTENDEE], limit: $limit, offset: $offset) {
        limit
        offset
        totalCount
        nodes {
          account {
            name
            slug
            type
            website
            location {
              address
              country
            }
            ... on Individual {
              email
            }
            activeRecurringContributions: orders(
              oppositeAccount: { slug: $slug }
              onlyActiveSubscriptions: true
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                status
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
            inactiveRecurringContributions: orders(
              oppositeAccount: { slug: $slug }
              status: [PAUSED, CANCELLED]
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                status
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
          isActive
          totalDonations {
            value
            currency
          }
        }
      }
    }
  }
`;

const recurringContribution = (m: ContributorRow) =>
  get(m, 'account.activeRecurringContributions.nodes[0]') || get(m, 'account.inactiveRecurringContributions.nodes[0]');

const getFormattedDateValue = (member: ContributorRow, path: string) => {
  const createdAt = get(member, path);
  return createdAt ? moment.utc(createdAt).format('YYYY-MM-DD') : undefined;
};

const csvMapping = {
  isActive: 'isActive',
  contributorUrl: (m: ContributorRow) => {
    const slug = get(m, 'account.slug');
    return slug ? `${process.env.WEBSITE_URL}/${slug}` : undefined;
  },
  contributorName: 'account.name',
  contributorEmail: 'account.email',
  contributorWebsite: 'account.website',
  contributorType: 'account.type',
  totalContributions: 'totalDonations.value',
  currency: 'totalDonations.currency',
  address: (t: ContributorRow) => get(t, 'account.location.address'),
  country: (t: ContributorRow) => get(t, 'account.location.country'),
  recurringContribution: (m: ContributorRow) => (recurringContribution(m) ? 'yes' : 'no'),
  recurringContributionStatus: (m: ContributorRow) => get(recurringContribution(m), 'status'),
  recurringContributionTier: (m: ContributorRow) => get(recurringContribution(m), 'tier.name'),
  recurringContributionAmount: (m: ContributorRow) => get(recurringContribution(m), 'amount.value'),
  recurringContributionCurrency: (m: ContributorRow) => get(recurringContribution(m), 'amount.currency'),
  recurringContributionFrequency: (m: ContributorRow) => get(recurringContribution(m), 'frequency'),
  contributorFirstContributionDate: (m: ContributorRow) =>
    getFormattedDateValue(m, 'account.firstContributions.nodes[0].createdAt'),
  contributorLatestContributionDate: (m: ContributorRow) =>
    getFormattedDateValue(m, 'account.latestContributions.nodes[0].createdAt'),
};

const allFields = Object.keys(csvMapping);

const defaultFields = [
  'contributorUrl',
  'contributorName',
  'contributorEmail',
  'contributorWebsite',
  'contributorType',
  'address',
  'country',
  'contributorFirstContributionDate',
  'contributorLatestContributionDate',
  'totalContributions',
  'currency',
  'recurringContribution',
  'recurringContributionTier',
  'recurringContributionStatus',
  'recurringContributionAmount',
  'recurringContributionCurrency',
  'recurringContributionFrequency',
];

type ContributorMapping = Record<string, string | ((row: ContributorRow) => unknown)>;

const applyMapping = (mapping: ContributorMapping, row: ContributorRow) => {
  const res: Record<string, unknown> = {};
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

const accountContributors = async (
  req: Request<AccountContributorsParams, unknown, unknown, AccountContributorsQuery>,
  res: Response,
): Promise<Response | void> => {
  if (!['HEAD', 'GET'].includes(req.method)) {
    return res.status(405).send({ error: { message: 'Method not allowed' } });
  }

  const variables: AccountContributorsVariables = pick({ ...req.params, ...req.query }, ['slug', 'limit', 'offset']);
  variables.limit =
    // If HEAD, we only want count, so we set limit to 0
    req.method === 'HEAD'
      ? 0
      : // Else, we use the limit provided by the user,
        variables.limit
        ? Number(variables.limit)
        : 500;
  variables.offset = Number(variables.offset) || 0;

  let fields = (get(req.query, 'fields', '') as string)
    .split(',')
    .map(trim)
    .filter((v) => !!v);

  if (fields.length === 0) {
    const remove = (get(req.query, 'remove', '') as string)
      .split(',')
      .map(trim)
      .filter((v) => !!v);

    const add = (get(req.query, 'add', '') as string)
      .split(',')
      .map(trim)
      .filter((v) => !!v);

    fields = difference(intersection(allFields, [...defaultFields, ...add]), remove);
  }

  const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll);

  try {
    // Forward Api Key or Authorization header
    const headers: Record<string, string> = {};
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

    setPrivateCacheHeadersIfAuthenticated(req, res);

    let result = await graphqlRequest<ContributorsQuery>(contributorsQuery, variables, {
      version: 'v2',
      headers,
    });

    let page = getContributorsPage(result);

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
        res.append('X-Exported-Rows', String(page.totalCount));
        if (req.method === 'HEAD') {
          return res.status(200).end();
        }

        if (page.totalCount === 0) {
          res.write(json2csv([], { fields }));
          res.write(`\n`);
          res.end();
          return;
        }

        const mapping = pick(csvMapping, fields);

        const mappedResults = page.nodes.map((t) => applyMapping(mapping, t));
        res.write(json2csv(mappedResults));
        res.write(`\n`);

        if (page.totalCount > page.limit) {
          if (fetchAll && page.limit > 0) {
            do {
              variables.offset = Number(variables.offset) + page.limit;

              result = await graphqlRequest<ContributorsQuery>(contributorsQuery, variables, {
                version: 'v2',
                headers,
              });

              page = getContributorsPage(result);

              const mappedResults = page.nodes.map((t) => applyMapping(mapping, t));
              res.write(json2csv(mappedResults, { header: false }));
              res.write(`\n`);
            } while (hasNextPage(page));
          } else {
            res.write(`Warning: totalCount is ${page.totalCount} and limit was ${page.limit}`);
          }
        }
        res.end();
        break;
      }

      default:
        res.send(result.account?.members);
        break;
    }
  } catch (err) {
    // Everything thrown by the GraphQL client is an Error
    const { message } = err as Error;
    if (message.match(/No account found/)) {
      return res.status(404).send('Not account found.');
    }
    logger.error(`Error while fetching account contributors: ${message}`);
    res.status(400).send(`Error while fetching account contributors.`);
  }
};

export default accountContributors;
