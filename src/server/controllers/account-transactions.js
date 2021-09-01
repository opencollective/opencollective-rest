import gqlV2 from 'graphql-tag';
import { difference, get, head, intersection, pick, toUpper, trim } from 'lodash';
import moment from 'moment';

import { graphqlRequest } from '../lib/graphql';
import { json2csv, parseToBooleanDefaultFalse } from '../lib/utils';
import { logger } from '../logger';

const query = gqlV2/* GraphQL */ `
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
    $fetchHostFee: Boolean
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
    ) {
      limit
      offset
      totalCount
      nodes {
        id
        legacyId
        group
        type
        kind
        description
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
          type
        }
        oppositeAccount {
          id
          slug
          name
          type
        }
        host {
          id
          slug
          name
          type
        }
        order {
          id
          legacyId
          status
          createdAt
          frequency
          paymentMethod {
            service
            type
          }
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
  }
`;

const formatAmountAsString = (amount) => {
  const amountAsString = new Intl.NumberFormat('en-US', { style: 'currency', currency: amount.currency }).format(
    amount.value,
  );

  return `${amountAsString} ${amount.currency}`;
};

const csvMapping = {
  date: (t) => moment.utc(t.createdAt).format('YYYY-MM-DD'),
  datetime: (t) => moment.utc(t.createdAt).format('YYYY-MM-DDTHH:mm'),
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
  accountName: (t) => get(t, 'account.name'),
  accountType: (t) => get(t, 'account.type'),
  oppositeAccountSlug: (t) => get(t, 'oppositeAccount.slug'),
  oppositeAccountName: (t) => get(t, 'oppositeAccount.name'),
  oppositeAccountType: (t) => get(t, 'oppositeAccount.type'),
  hostSlug: (t) => get(t, 'host.slug'),
  hostName: (t) => get(t, 'host.name'),
  hostType: (t) => get(t, 'host.type'),
  orderId: (t) => get(t, 'order.id'),
  orderLegacyId: (t) => get(t, 'order.legacyId'),
  orderFrequency: (t) => get(t, 'order.frequency'),
  paymentMethodService: (t) => get(t, 'order.paymentMethod.service'),
  paymentMethodType: (t) => get(t, 'order.paymentMethod.type'),
  expenseId: (t) => get(t, 'expense.id'),
  expenseLegacyId: (t) => get(t, 'expense.legacyId'),
  expenseType: (t) => get(t, 'expense.type'),
  payoutMethodType: (t) => get(t, 'order.payoutMethod.type'),
};

const allKinds = [
  'ADDED_FUNDS',
  'CONTRIBUTION',
  'EXPENSE',
  'HOST_FEE',
  'HOST_FEE_SHARE',
  'PAYMENT_PROCESSOR_FEE',
  'PLATFORM_FEE',
  'PLATFORM_TIP',
  'PREPAID_PAYMENT_METHOD',
  'HOST_FEE_SHARE_DEBT',
  'PLATFORM_TIP_DEBT',
  'BALANCE_TRANSFER',
];

let allFields = Object.keys(csvMapping);

const defaultFields = [
  'datetime',
  'shortGroup',
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
  'oppositeAccountSlug',
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
    'flattenHostFee',
  ]);
  variables.limit = Number(variables.limit) || 1000;
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

  if (variables.flattenHostFee) {
    variables.fetchHostFee = parseToBooleanDefaultFalse(variables.flattenHostFee);
    if (variables.fetchHostFee) {
      variables.kind = difference(variables.kind || allKinds, ['HOST_FEE']);
    } else {
      allFields = difference(allFields, ['hostFee']);
    }
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

    fields = difference(intersection(allFields, [...defaultFields, ...add]), remove);
  }

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

    const result = await graphqlRequest(query, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'txt':
      case 'csv': {
        if (req.params.format === 'csv') {
          res.setHeader('content-type', 'text/csv;charset=utf-8');
        } else {
          res.setHeader('content-type', 'text/plain;charset=utf-8');
        }

        if (result.transactions.totalCount === 0) {
          res.send('Warning: no result');
          break;
        }

        const mapping = pick(csvMapping, fields);

        const mappedTransactions = result.transactions.nodes.map((t) => applyMapping(mapping, t));

        let csv = json2csv(mappedTransactions);

        if (result.transactions.totalCount > result.transactions.limit) {
          csv += `\nWarning: totalCount is ${result.transactions.totalCount} and limit was ${result.transactions.limit}`;
        }

        res.send(csv);
        break;
      }

      default:
        res.send(result.transactions);
        break;
    }
  } catch (err) {
    if (err.message.match(/No account found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(`Error while fetching collective transactions: ${err.message}`);
    res.status(400).send(`Error while fetching account transactions.`);
  }
};

export default accountTransactions;
