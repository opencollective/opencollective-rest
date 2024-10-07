import assert from 'assert';

import { Parser } from '@json2csv/plainjs';
import type { RequestHandler } from 'express';
import gqlV2 from 'graphql-tag';
import { get, pick, toNumber, trim } from 'lodash';
import moment from 'moment';

import { amountAsString } from '../lib/formatting';
import { graphqlRequest } from '../lib/graphql';
import { applyMapping, parseToBooleanDefaultTrue, splitEnums } from '../lib/utils';
import { logger } from '../logger';

function json2csv(data, opts) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

export const hostedCollectivesQuery = gqlV2`
  query HostedCollectives(
    $hostSlug: String!
    $limit: Int!
    $offset: Int!
    $sort: OrderByInput
    $hostFeesStructure: HostFeeStructure
    $searchTerm: String
    $type: [AccountType]
    $isApproved: Boolean
    $isFrozen: Boolean
    $isUnhosted: Boolean
    $balance: AmountRangeInput
    $consolidatedBalance: AmountRangeInput
    $currencies: [String]
  ) {
    host(slug: $hostSlug) {
      id
      legacyId
      slug
      name
      currency
      isHost
      type
      settings
      hostFeePercent
      hostedAccounts(
        limit: $limit
        offset: $offset
        searchTerm: $searchTerm
        hostFeesStructure: $hostFeesStructure
        accountType: $type
        orderBy: $sort
        isApproved: $isApproved
        isFrozen: $isFrozen
        isUnhosted: $isUnhosted
        balance: $balance
        consolidatedBalance: $consolidatedBalance
        currencies: $currencies
      ) {
        offset
        limit
        totalCount
        nodes {
          id
          legacyId
          name
          legalName
          slug
          website
          type
          currency
          imageUrl(height: 96)
          isFrozen
          isHost
          tags
          settings
          createdAt
          stats {
            id
            balance {
              value
              currency
            }
            totalAmountSpent {
              value
              currency
            }
            totalAmountReceived(net: true) {
              value
              currency
            }
          }
          policies {
            id
            COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS
          }
          ... on AccountWithHost {
            hostFeesStructure
            hostFeePercent
            approvedAt
            hostAgreements {
              totalCount
              nodes {
                id
                title
                attachment {
                  id
                  url
                  name
                  type
                }
              }
            }
          }
          admins: members(role: [ADMIN]) {
            totalCount
            nodes {
              id
              account {
                id
                name
                legalName
                emails
              }
            }
          }
          ... on AccountWithParent {
            parent {
              id
              slug
              name
            }
          }
          lastExpenseReceived: expenses(limit: 1, direction: RECEIVED, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              id
              createdAt
            }
          }
          firstExpenseReceived: expenses(limit: 1, direction: RECEIVED, orderBy: { field: CREATED_AT, direction: ASC }) {
            nodes {
              id
              createdAt
            }
          }
          numberOfExpenses: expenses(direction: RECEIVED) {
            totalCount
          }
          firstContributionReceived: orders(limit: 1, status: [PAID, ACTIVE], orderBy: { field: CREATED_AT, direction: ASC }) {
            nodes {
              createdAt
            }
          }
          lastContributionReceived: orders(limit: 1, status: [PAID, ACTIVE], orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              createdAt
            }
          }
          numberOfContributions: orders(status: [PAID, ACTIVE]) {
            totalCount
          }
        }
      }
    }
  }
`;

const csvMapping = {
  name: 'name',
  slug: 'slug',
  type: 'type',
  legalName: 'legalName',
  description: 'description',
  website: 'website',
  currency: 'currency',
  approvedAt: 'approvedAt',
  balance: (account) => amountAsString(account.stats.balance),
  hostFeePercent: 'hostFeePercent',
  adminEmails: (account) => account.admins?.nodes.map((admin) => admin.account?.emails?.join(',')).join(','),
  adminCount: (account) => account.admins?.totalCount,
  firstContributionDate: (account) => account.firstContributionReceived?.nodes[0]?.createdAt,
  lastContributionDate: (account) => account.lastContributionReceived?.nodes[0]?.createdAt,
  totalAmountOfContributions: (account) =>
    account.stats.totalAmountReceived && amountAsString(account.stats.totalAmountReceived),
  totalNumberOfContributions: (account) => account.numberOfContributions?.totalCount,
  firstExpenseDate: (account) => account.firstExpenseReceived?.nodes[0]?.createdAt,
  lastExpenseDate: (account) => account.lastExpenseReceived?.nodes[0]?.createdAt,
  numberOfExpenses: (account) => account.numberOfExpenses?.totalCount,
};

const hostedCollectives: RequestHandler<{ slug: string; format: 'csv' | 'json' }> = async (req, res) => {
  if (!['HEAD', 'GET'].includes(req.method)) {
    res.status(405).send({ error: { message: 'Method not allowed' } });
    return;
  }

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

    const hostSlug = req.params.slug;
    assert(hostSlug, 'Please provide a slug');

    const variables = {
      hostSlug,
      limit: req.method === 'HEAD' ? 0 : req.query.limit ? toNumber(req.query.limit) : 1000,
      offset: req.query.offset ? toNumber(req.query.offset) : 0,
      sort: req.query.sort,
      hostFeesStructure: req.query.hostFeesStructure,
      searchTerm: req.query.searchTerm,
      type: splitEnums(req.query.type as string),
      isApproved: req.query.isApproved ? parseToBooleanDefaultTrue(req.query.isApproved as string) : undefined,
      isFrozen: req.query.isFrozen ? parseToBooleanDefaultTrue(req.query.isFrozen as string) : undefined,
      isUnhosted: req.query.isUnhosted ? parseToBooleanDefaultTrue(req.query.isUnhosted as string) : undefined,
      currencies: splitEnums(req.query.currencies as string),
    };
    logger.debug('hostedCollectives:query', variables);

    const fields = (get(req.query, 'fields', '') as string)
      .split(',')
      .map(trim)
      .filter((v) => !!v);

    let result = await graphqlRequest(hostedCollectivesQuery, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'csv': {
        // don't cache at CDN level as the result may contain private information
        if (authorization || apiKey || personalToken) {
          res.append('Cache-Control', 'no-cache');
        }
        if (req.params.format === 'csv') {
          res.append('Content-Type', `text/csv;charset=utf-8`);
        } else {
          res.append('Content-Type', `text/plain;charset=utf-8`);
        }
        const filename = `hosted-collectives-${hostSlug}-${moment.utc().format('YYYYMMDD')}.${req.params.format}`;
        res.append('Content-Disposition', `attachment; filename="${filename}"`);
        res.append('Access-Control-Expose-Headers', 'X-Exported-Rows');
        res.append('X-Exported-Rows', result.host.hostedAccounts.totalCount);
        if (req.method === 'HEAD') {
          res.status(200).end();
          return;
        }

        if (result.host.hostedAccounts.totalCount === 0) {
          res.status(404).send('No transaction found.');
          break;
        }

        const mapping = pick(csvMapping, fields);
        const mappedTransactions = result.host.hostedAccounts.nodes.map((t) => applyMapping(mapping, t));
        res.write(json2csv(mappedTransactions, null));
        res.write(`\n`);

        if (result.host.hostedAccounts.totalCount > result.host.hostedAccounts.limit) {
          do {
            variables.offset += result.host.hostedAccounts.limit;
            result = await graphqlRequest(hostedCollectivesQuery, variables, { version: 'v2', headers });
            const mappedTransactions = result.host.hostedAccounts.nodes.map((t) => applyMapping(mapping, t));
            res.write(json2csv(mappedTransactions, { header: false }));
            res.write(`\n`);
          } while (
            result.host.hostedAccounts.totalCount >
            result.host.hostedAccounts.limit + result.host.hostedAccounts.offset
          );
        }

        res.end();
        break;
      }
      default:
        res.send(result.host.hostedAccounts);
        break;
    }
  } catch (err) {
    if (err.message.match(/not found/i)) {
      res.status(404).send(err.message);
    } else {
      logger.error(`Error while fetching hosted collectives: ${err.message}`);
      logger.debug(err);
      if (res.headersSent) {
        res.end(`\nError while fetching hosted collectives.`);
      } else {
        res.status(400).send(`Error while fetching hosted collectives.`);
      }
    }
  }
};

export default hostedCollectives;
