import assert from 'assert';

import { Parser } from '@json2csv/plainjs';
import type { RequestHandler } from 'express';
import gqlV2 from 'graphql-tag';
import { compact, get, pick, toNumber, trim } from 'lodash';
import moment from 'moment';

import { amountAsString, formatContact, shortDate } from '../lib/formatting';
import { graphqlRequest } from '../lib/graphql';
import { applyMapping, parseToBooleanDefaultFalse, parseToBooleanDefaultTrue, splitEnums } from '../lib/utils';
import { logger } from '../logger';

function json2csv(data, opts) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

type Fields =
  | 'name'
  | 'slug'
  | 'type'
  | 'legalName'
  | 'description'
  | 'website'
  | 'currency'
  | 'approvedAt'
  | 'balance'
  | 'hostFeePercent'
  | 'adminEmails'
  | 'adminCount'
  | 'firstContributionDate'
  | 'lastContributionDate'
  | 'firstExpenseDate'
  | 'lastExpenseDate'
  | 'status'
  | 'dateApplied'
  | 'unhostedAt'
  | 'unfrozenAt'
  | 'numberOfExpensesYear'
  | 'valueOfExpensesYear'
  | 'maxExpenseValueYear'
  | 'numberOfPayeesYear'
  | 'numberOfContributionsYear'
  | 'valueOfContributionsYear'
  | 'valueOfHostFeeYear'
  | 'spentTotalYear'
  | 'numberOfExpensesAllTime'
  | 'valueOfExpensesAllTime'
  | 'maxExpenseValueAllTime'
  | 'numberOfPayeesAllTime'
  | 'numberOfContributionsAllTime'
  | 'valueOfContributionsAllTime'
  | 'valueOfHostFeeAllTime'
  | 'spentTotalAllTime';

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
    $includeYearSummary: Boolean!
    $lastYear: DateTime!
    $includeAllTimeSummary: Boolean!
  ) {
    host(slug: $hostSlug) {
      id
      legacyId
      slug
      name
      currency
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
          unhostedAt(host: { slug: $hostSlug })
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
            host {
              id
              legacyId
              slug
            }
            hostFeesStructure
            hostFeePercent
            approvedAt
            unfrozenAt
            hostApplication {
              id
              createdAt
            }
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
            yearSummary: summary(dateFrom: $lastYear) @include(if: $includeYearSummary) {
              expenseTotal { valueInCents, value, currency }
              expenseCount
              expenseMaxValue { valueInCents, value, currency }
              expenseDistinctPayee
              contributionCount
              contributionTotal { valueInCents, value, currency }
              hostFeeTotal { valueInCents, value, currency }
              spentTotal { valueInCents, value, currency}
            }
            allTimeSummary: summary @include(if: $includeAllTimeSummary) {
              expenseTotal { valueInCents, value, currency }
              expenseCount
              expenseMaxValue { valueInCents, value, currency }
              expenseDistinctPayee
              contributionCount
              contributionTotal { valueInCents, value, currency }
              hostFeeTotal { valueInCents, value, currency }
              spentTotal { valueInCents, value, currency}
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
                ... on Individual {
                  email
                }
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

const csvMapping: Record<Fields, string | Function> = {
  name: 'name',
  slug: 'slug',
  type: 'type',
  legalName: 'legalName',
  description: 'description',
  website: 'website',
  currency: 'currency',
  approvedAt: (account) => shortDate(account.approvedAt),
  hostFeePercent: 'hostFeePercent',
  balance: (account) => amountAsString(account.stats.balance),
  adminEmails: (account) => compact(account.admins?.nodes.map((member) => formatContact(member.account))).join(', '),
  adminCount: (account) => account.admins?.totalCount,
  firstContributionDate: (account) => shortDate(account.firstContributionReceived?.nodes[0]?.createdAt),
  lastContributionDate: (account) => shortDate(account.lastContributionReceived?.nodes[0]?.createdAt),
  firstExpenseDate: (account) => shortDate(account.firstExpenseReceived?.nodes[0]?.createdAt),
  lastExpenseDate: (account) => shortDate(account.lastExpenseReceived?.nodes[0]?.createdAt),
  status: (account, host) => {
    if (account.host?.id !== host.id) {
      return 'UNHOSTED';
    } else if (account.isFrozen) {
      return 'FROZEN';
    } else {
      return 'ACTIVE';
    }
  },
  // Added fields
  dateApplied: (account) => shortDate(account.hostApplication?.createdAt),
  unhostedAt: (account) => account.unhostedAt && shortDate(account.unhostedAt),
  unfrozenAt: (account) => account.unfrozenAtd && shortDate(account.unfrozenAt),
  numberOfExpensesYear: (account) => account.yearSummary?.expenseCount,
  valueOfExpensesYear: (account) =>
    account.yearSummary?.expenseTotal && amountAsString(account.yearSummary.expenseTotal),
  maxExpenseValueYear: (account) =>
    account.yearSummary?.expenseMaxValue && amountAsString(account.yearSummary.expenseMaxValue),
  numberOfPayeesYear: (account) => account.yearSummary?.expenseDistinctPayee,
  numberOfContributionsYear: (account) => account.yearSummary?.contributionCount,
  valueOfContributionsYear: (account) =>
    account.yearSummary?.contributionTotal && amountAsString(account.yearSummary.contributionTotal),
  valueOfHostFeeYear: (account) =>
    account.yearSummary?.hostFeeTotal && amountAsString(account.yearSummary.hostFeeTotal),
  spentTotalYear: (account) => account.yearSummary?.spentTotal && amountAsString(account.yearSummary.spentTotal),
  numberOfExpensesAllTime: (account) => account.allTimeSummary?.expenseCount,
  valueOfExpensesAllTime: (account) =>
    account.allTimeSummary?.expenseTotal && amountAsString(account.allTimeSummary.expenseTotal),
  maxExpenseValueAllTime: (account) =>
    account.allTimeSummary?.expenseMaxValue && amountAsString(account.allTimeSummary.expenseMaxValue),
  numberOfPayeesAllTime: (account) => account.allTimeSummary?.expenseDistinctPayee,
  numberOfContributionsAllTime: (account) => account.allTimeSummary?.contributionCount,
  valueOfContributionsAllTime: (account) =>
    account.allTimeSummary?.contributionTotal && amountAsString(account.allTimeSummary.contributionTotal),
  valueOfHostFeeAllTime: (account) =>
    account.allTimeSummary?.hostFeeTotal && amountAsString(account.allTimeSummary.hostFeeTotal),
  spentTotalAllTime: (account) =>
    account.allTimeSummary?.spentTotal && amountAsString(account.allTimeSummary.spentTotal),
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

    const fields = (get(req.query, 'fields', '') as string)
      .split(',')
      .map(trim)
      .filter((v) => !!v) as Fields[];

    const variables = {
      hostSlug,
      limit: req.method === 'HEAD' ? 0 : req.query.limit ? toNumber(req.query.limit) : 1000,
      offset: req.query.offset ? toNumber(req.query.offset) : 0,
      sort: req.query.sort && JSON.parse(req.query.sort as string),
      consolidatedBalance: req.query.consolidatedBalance && JSON.parse(req.query.consolidatedBalance as string),
      hostFeesStructure: req.query.hostFeesStructure,
      searchTerm: req.query.searchTerm,
      type: splitEnums(req.query.type as string),
      isApproved: req.query.isApproved ? parseToBooleanDefaultTrue(req.query.isApproved as string) : undefined,
      isFrozen: req.query.isFrozen ? parseToBooleanDefaultTrue(req.query.isFrozen as string) : undefined,
      isUnhosted: req.query.isUnhosted ? parseToBooleanDefaultTrue(req.query.isUnhosted as string) : undefined,
      currencies: splitEnums(req.query.currencies as string),
      lastYear: moment().subtract(1, 'year').toISOString(),
      includeYearSummary: fields.some((field) =>
        [
          'numberOfExpensesYear',
          'valueOfExpensesYear',
          'maxExpenseValueYear',
          'numberOfPayeesYear',
          'numberOfContributionsYear',
          'valueOfContributionsYear',
          'valueOfHostFeeYear',
        ].includes(field),
      ),
      includeAllTimeSummary: fields.some((field) =>
        [
          'numberOfExpensesAllTime',
          'valueOfExpensesAllTime',
          'maxExpenseValueAllTime',
          'numberOfPayeesAllTime',
          'numberOfContributionsAllTime',
          'valueOfContributionsAllTime',
          'valueOfHostFeeAllTime',
        ].includes(field),
      ),
    };
    const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll as string);
    logger.debug('hostedCollectives:query', { variables, headers });

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
        const mappedTransactions = result.host.hostedAccounts.nodes.map((t) => applyMapping(mapping, t, result.host));
        res.write(json2csv(mappedTransactions, null));
        res.write(`\n`);

        if (result.host.hostedAccounts.totalCount > result.host.hostedAccounts.limit) {
          if (fetchAll) {
            do {
              variables.offset += result.host.hostedAccounts.limit;
              result = await graphqlRequest(hostedCollectivesQuery, variables, { version: 'v2', headers });
              const mappedTransactions = result.host.hostedAccounts.nodes.map((t) =>
                applyMapping(mapping, t, result.host),
              );
              res.write(json2csv(mappedTransactions, { header: false }));
              res.write(`\n`);
            } while (
              result.host.hostedAccounts.totalCount >
              result.host.hostedAccounts.limit + result.host.hostedAccounts.offset
            );
          } else {
            res.write(
              `Warning: totalCount is ${result.host.hostedAccounts.totalCount} and limit was ${result.host.hostedAccounts.limit}`,
            );
          }
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
