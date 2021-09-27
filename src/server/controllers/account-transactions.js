import gqlV2 from 'graphql-tag';
import { Parser } from 'json2csv';
import { difference, get, head, intersection, pick, toUpper, trim } from 'lodash';
import moment from 'moment';

import { graphqlRequest } from '../lib/graphql';
import { parseToBooleanDefaultFalse, parseToBooleanDefaultTrue } from '../lib/utils';
import { logger } from '../logger';

function json2csv(data, opts) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

export const transactionsFragment = gqlV2/* GraphQL */ `
  fragment TransactionsFragment on TransactionCollection {
    __typename
    limit
    offset
    totalCount
    nodes {
      id
      legacyId
      group
      type
      kind
      description(dynamic: true, full: $fullDescription)
      createdAt
      amount {
        value
        currency
      }
      amountInHostCurrency {
        value
        currency
      }
      paymentProcessorFee {
        value
        currency
      }
      hostFee(fetchHostFee: $fetchHostFee) {
        value
        currency
      }
      netAmountInHostCurrency(fetchHostFee: $fetchHostFee) {
        value
        currency
      }
      account {
        id
        slug
        name
        legalName
        type
        ... on Individual {
          email
        }
      }
      oppositeAccount {
        id
        slug
        name
        legalName
        type
        ... on Individual {
          email
        }
      }
      host {
        id
        slug
        name
        legalName
        type
      }
      order {
        id
        legacyId
        status
        createdAt
        frequency
      }
      paymentMethod {
        service
        type
      }
      expense {
        id
        legacyId
        type
        createdAt
        payoutMethod {
          type
        }
      }
      isRefund
      isRefunded
    }
  }
`;

/* $fetchHostFee seems not used but it is in fragment */
/* eslint-disable graphql/template-strings */

const transactionsQuery = gqlV2/* GraphQL */ `
  query AccountTransactions(
    $slug: String
    $limit: Int
    $offset: Int
    $type: TransactionType
    $kind: [TransactionKind]
    $dateFrom: DateTime
    $dateTo: DateTime
    $minAmount: Int
    $maxAmount: Int
    $searchTerm: String
    $includeIncognitoTransactions: Boolean
    $includeChildrenTransactions: Boolean
    $includeGiftCardTransactions: Boolean
    $includeRegularTransactions: Boolean
    $fetchHostFee: Boolean
    $fullDescription: Boolean
  ) {
    transactions(
      includeDebts: true
      account: { slug: $slug }
      limit: $limit
      offset: $offset
      type: $type
      kind: $kind
      dateFrom: $dateFrom
      dateTo: $dateTo
      minAmount: $minAmount
      maxAmount: $maxAmount
      searchTerm: $searchTerm
      includeIncognitoTransactions: $includeIncognitoTransactions
      includeChildrenTransactions: $includeChildrenTransactions
      includeGiftCardTransactions: $includeGiftCardTransactions
      includeRegularTransactions: $includeRegularTransactions
    ) {
      ...TransactionsFragment
    }
  }
  ${transactionsFragment}
`;

const hostTransactionsQuery = gqlV2/* GraphQL */ `
  query HostTransactions(
    $slug: String
    $limit: Int
    $offset: Int
    $type: TransactionType
    $kind: [TransactionKind]
    $dateFrom: DateTime
    $dateTo: DateTime
    $minAmount: Int
    $maxAmount: Int
    $fetchHostFee: Boolean
    $fullDescription: Boolean
  ) {
    transactions(
      includeDebts: true
      host: { slug: $slug }
      limit: $limit
      offset: $offset
      type: $type
      kind: $kind
      dateFrom: $dateFrom
      dateTo: $dateTo
      minAmount: $minAmount
      maxAmount: $maxAmount
    ) {
      ...TransactionsFragment
    }
  }
  ${transactionsFragment}
`;

/* eslint-enable graphql/template-strings */

const formatAmountAsString = (amount) => {
  const amountAsString = new Intl.NumberFormat('en-US', { style: 'currency', currency: amount.currency }).format(
    amount.value,
  );

  return `${amountAsString} ${amount.currency}`;
};

const formatAccountName = (account) => {
  const legalName = account?.legalName;
  const name = account?.name;
  if (!legalName && !name) {
    return '';
  } else if (legalName && name && legalName !== name) {
    return `${legalName} (${name})`;
  } else {
    return legalName || name;
  }
};

const csvMapping = {
  date: (t) => moment.utc(t.createdAt).format('YYYY-MM-DD'),
  datetime: (t) => moment.utc(t.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
  id: 'id',
  legacyId: 'legacyId',
  shortId: (t) => t.id.substr(0, 8),
  shortGroup: (t) => t.group.substr(0, 8),
  group: 'group',
  description: 'description',
  type: 'type',
  kind: 'kind',
  isRefund: (t) => (t.isRefund ? 'REFUND' : ''),
  isRefunded: (t) => (t.isRefunded ? 'REFUNDED' : ''),
  displayAmount: (t) => formatAmountAsString(t.amount),
  amount: (t) => get(t, 'amountInHostCurrency.value', 0),
  paymentProcessorFee: (t) => get(t, 'paymentProcessorFee.value', 0),
  hostFee: (t) => get(t, 'hostFee.value', 0),
  netAmount: (t) => get(t, 'netAmountInHostCurrency.value', 0),
  currency: (t) => get(t, 'amountInHostCurrency.currency'),
  accountSlug: (t) => get(t, 'account.slug'),
  accountName: (t) => formatAccountName(t.account),
  accountType: (t) => get(t, 'account.type'),
  accountEmail: (t) => get(t, 'account.email'),
  oppositeAccountSlug: (t) => get(t, 'oppositeAccount.slug'),
  oppositeAccountName: (t) => formatAccountName(t.oppositeAccount),
  oppositeAccountType: (t) => get(t, 'oppositeAccount.type'),
  oppositeAccountEmail: (t) => get(t, 'oppositeAccount.email'),
  hostSlug: (t) => get(t, 'host.slug'),
  hostName: (t) => formatAccountName(t.host),
  hostType: (t) => get(t, 'host.type'),
  orderId: (t) => get(t, 'order.id'),
  orderLegacyId: (t) => get(t, 'order.legacyId'),
  orderFrequency: (t) => get(t, 'order.frequency'),
  paymentMethodService: (t) => get(t, 'paymentMethod.service'),
  paymentMethodType: (t) => get(t, 'paymentMethod.type'),
  expenseId: (t) => get(t, 'expense.id'),
  expenseLegacyId: (t) => get(t, 'expense.legacyId'),
  expenseType: (t) => get(t, 'expense.type'),
  payoutMethodType: (t) => get(t, 'expense.payoutMethod.type'),
};

const allKinds = [
  'ADDED_FUNDS',
  'CONTRIBUTION',
  'EXPENSE',
  'HOST_FEE',
  'HOST_FEE_SHARE',
  'PAYMENT_PROCESSOR_COVER',
  'PAYMENT_PROCESSOR_FEE',
  'PLATFORM_FEE',
  'PLATFORM_TIP',
  'PREPAID_PAYMENT_METHOD',
  'HOST_FEE_SHARE_DEBT',
  'PLATFORM_TIP_DEBT',
  'BALANCE_TRANSFER',
];

const allFields = Object.keys(csvMapping);

const defaultFields = [
  'datetime',
  'shortGroup',
  'description',
  'type',
  'kind',
  'isRefund',
  'isRefunded',
  'displayAmount',
  'amount',
  'paymentProcessorFee',
  'hostFee',
  'netAmount',
  'currency',
  'accountSlug',
  'accountName',
  'oppositeAccountSlug',
  'oppositeAccountName',
  // Payment Method (for orders)
  'paymentMethodService',
  'paymentMethodType',
  // Type and Payout Method (for expenses)
  'expenseType',
  'payoutMethodType',
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

const accountTransactions = async (req, res) => {
  const variables = pick({ ...req.params, ...req.query }, [
    'slug',
    'limit',
    'offset',
    'type',
    'kind',
    'dateFrom',
    'dateTo',
    'minAmount',
    'maxAmount',
    'searchTerm',
    'includeIncognitoTransactions',
    'includeChildrenTransactions',
    'includeGiftCardTransactions',
  ]);
  variables.limit = variables.limit ? Number(variables.limit) : 1000;
  variables.offset = Number(variables.offset) || 0;

  if (variables.dateFrom) {
    variables.dateFrom = moment.utc(variables.dateFrom).toISOString();
  }
  if (variables.dateTo) {
    // Detect short form (e.g: 2021-08-30)
    const shortDate = variables.dateTo.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    variables.dateTo = moment.utc(variables.dateTo);
    // Extend to end of the day, 1 sec before midnight
    if (shortDate) {
      variables.dateTo.set('hour', 23).set('minute', 59).set('second', 59);
    }
    variables.dateTo = variables.dateTo.toISOString();
  }

  if (variables.minAmount) {
    variables.minAmount = Number(variables.minAmount);
  }
  if (variables.maxAmount) {
    variables.maxAmount = Number(variables.maxAmount);
  }

  if (variables.type) {
    variables.type = intersection(variables.type.split(',').map(toUpper), ['CREDIT', 'DEBIT']);

    // Not a list in GraphQL for now, take the first
    variables.type = head(variables.type);
  }

  if (variables.kind) {
    variables.kind = variables.kind.split(',').map(toUpper).map(trim);
  }

  if (variables.includeIncognitoTransactions) {
    variables.includeIncognitoTransactions = parseToBooleanDefaultFalse(variables.includeIncognitoTransactions);
  }

  if (variables.includeChildrenTransactions) {
    variables.includeChildrenTransactions = parseToBooleanDefaultFalse(variables.includeChildrenTransactions);
  }

  if (variables.includeGiftCardTransactions) {
    variables.includeGiftCardTransactions = parseToBooleanDefaultFalse(variables.includeGiftCardTransactions);
  }

  if (variables.includeRegularTransactions) {
    variables.includeRegularTransactions = parseToBooleanDefaultTrue(variables.includeRegularTransactions);
  }

  variables.fetchHostFee = parseToBooleanDefaultFalse(req.query.flattenHostFee);
  if (variables.fetchHostFee) {
    variables.kind = difference(variables.kind || allKinds, ['HOST_FEE']);
  }

  if (req.query.fullDescription) {
    variables.fullDescription = parseToBooleanDefaultFalse(req.query.fullDescription);
  } else {
    variables.fullDescription = req.params.reportType === 'hostTransactions' ? true : false;
  }

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

    const baseFields = variables.fetchHostFee ? allFields : difference(allFields, ['hostFee']);

    fields = difference(intersection(baseFields, [...defaultFields, ...add]), remove);
  }

  const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll);

  try {
    // Forward Api Key or Authorization header
    const headers = {};
    const apiKey = req.get('Api-Key') || req.query.apiKey;
    const authorization = req.get('Authorization');
    if (authorization) {
      headers['Authorization'] = authorization;
    } else if (apiKey) {
      headers['Api-Key'] = apiKey;
    }

    const query = req.params.reportType === 'hostTransactions' ? hostTransactionsQuery : transactionsQuery;

    let result = await graphqlRequest(query, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'txt':
      case 'csv': {
        if (req.params.format === 'csv') {
          res.setHeader('content-type', 'text/csv;charset=utf-8');
        } else {
          res.setHeader('content-type', 'text/plain;charset=utf-8');
        }

        if (result.transactions.totalCount === 0) {
          res.status(404).send('No transaction found.');
          break;
        }

        const mapping = pick(csvMapping, fields);

        const mappedTransactions = result.transactions.nodes.map((t) => applyMapping(mapping, t));
        res.write(json2csv(mappedTransactions));
        res.write(`\n`);

        if (result.transactions.totalCount > result.transactions.limit) {
          if (fetchAll) {
            do {
              variables.offset += result.transactions.limit;

              result = await graphqlRequest(query, variables, { version: 'v2', headers });

              const mappedTransactions = result.transactions.nodes.map((t) => applyMapping(mapping, t));
              res.write(json2csv(mappedTransactions, { header: false }));
              res.write(`\n`);
            } while (result.transactions.totalCount > result.transactions.limit + result.transactions.offset);
          } else {
            res.write(
              `Warning: totalCount is ${result.transactions.totalCount} and limit was ${result.transactions.limit}`,
            );
          }
        }

        res.end();

        break;
      }

      default:
        res.send(result.transactions);
        break;
    }
  } catch (err) {
    if (err.message.match(/No account found/)) {
      return res.status(404).send('Not account found.');
    }
    logger.error(`Error while fetching collective transactions: ${err.message}`);
    res.status(400).send(`Error while fetching account transactions.`);
  }
};

export default accountTransactions;
