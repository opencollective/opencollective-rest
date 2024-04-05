import { Parser } from '@json2csv/plainjs';
import gqlV2 from 'graphql-tag';
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
      clearedAt
      amount {
        value
        currency
      }
      amountInHostCurrency {
        value
        currency
      }
      balanceInHostCurrency {
        value
        currency
      }
      paymentProcessorFee(fetchPaymentProcessorFee: $fetchPaymentProcessorFee) {
        value
        currency
      }
      platformFee {
        value
        currency
      }
      hostFee(fetchHostFee: $fetchHostFee) {
        value
        currency
      }
      netAmountInHostCurrency(
        fetchHostFee: $fetchHostFee
        fetchPaymentProcessorFee: $fetchPaymentProcessorFee
        fetchTax: $fetchTax
      ) {
        value
        currency
      }
      taxAmount(fetchTax: $fetchTax) {
        value
        currency
      }
      taxInfo {
        id
        type
        rate
        idNumber
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
        memo
        processedAt
        customData
        accountingCategory @include(if: $hasAccountingCategoryField) {
          id
          code
          name
        }
      }
      paymentMethod {
        service
        type
      }
      expense {
        id
        legacyId
        type
        tags
        createdAt
        amount: amountV2 {
          value
          currency
        }
        payoutMethod {
          type
        }
        accountingCategory @include(if: $hasAccountingCategoryField) {
          id
          code
          name
        }
        approvedBy {
          slug
        }
        paidBy {
          slug
        }
        createdByAccount {
          slug
        }
      }
      isRefund
      isRefunded
      refundTransaction {
        id
        legacyId
      }
      merchantId
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
    $clearedFrom: DateTime
    $clearedTo: DateTime
    $minAmount: Int
    $maxAmount: Int
    $searchTerm: String
    $includeIncognitoTransactions: Boolean
    $includeChildrenTransactions: Boolean
    $includeGiftCardTransactions: Boolean
    $includeRegularTransactions: Boolean
    $fetchHostFee: Boolean
    $fetchPaymentProcessorFee: Boolean
    $fetchTax: Boolean
    $fullDescription: Boolean
    $hasAccountingCategoryField: Boolean!
    $paymentMethodType: [PaymentMethodType]
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
      clearedFrom: $clearedFrom
      clearedTo: $clearedTo
      minAmount: $minAmount
      maxAmount: $maxAmount
      searchTerm: $searchTerm
      includeIncognitoTransactions: $includeIncognitoTransactions
      includeChildrenTransactions: $includeChildrenTransactions
      includeGiftCardTransactions: $includeGiftCardTransactions
      includeRegularTransactions: $includeRegularTransactions
      paymentMethodType: $paymentMethodType
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
    $clearedFrom: DateTime
    $clearedTo: DateTime
    $minAmount: Int
    $maxAmount: Int
    $searchTerm: String
    $includeChildrenTransactions: Boolean
    $includeHost: Boolean
    $fetchHostFee: Boolean
    $fetchPaymentProcessorFee: Boolean
    $fetchTax: Boolean
    $fullDescription: Boolean
    $account: [AccountReferenceInput!]
    $hasAccountingCategoryField: Boolean!
    $paymentMethodType: [PaymentMethodType]
  ) {
    transactions(
      includeDebts: true
      host: { slug: $slug }
      account: $account
      limit: $limit
      offset: $offset
      type: $type
      kind: $kind
      dateFrom: $dateFrom
      dateTo: $dateTo
      clearedFrom: $clearedFrom
      clearedTo: $clearedTo
      minAmount: $minAmount
      maxAmount: $maxAmount
      searchTerm: $searchTerm
      includeChildrenTransactions: $includeChildrenTransactions
      includeHost: $includeHost
      paymentMethodType: $paymentMethodType
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

const getAccountingCategory = (transaction) => {
  return get(transaction, 'expense.accountingCategory') || get(transaction, 'order.accountingCategory');
};

const csvMapping = {
  accountingCategoryCode: (t) => getAccountingCategory(t)?.code || '',
  accountingCategoryName: (t) => getAccountingCategory(t)?.name || '',
  date: (t) => moment.utc(t.createdAt).format('YYYY-MM-DD'),
  datetime: (t) => moment.utc(t.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
  effectiveDate: (t) => (t.clearedAt ? moment.utc(t.clearedAt).format('YYYY-MM-DDTHH:mm:ss') : ''),
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
  refundId: (t) => get(t, 'refundTransaction.id', ''),
  shortRefundId: (t) => get(t, 'refundTransaction.id', '').substr(0, 8),
  displayAmount: (t) => formatAmountAsString(t.amount),
  amount: (t) => get(t, 'amountInHostCurrency.value', 0),
  creditAmount: (t) => (t.type === 'CREDIT' ? get(t, 'amountInHostCurrency.value', 0) : ''),
  debitAmount: (t) => (t.type === 'DEBIT' ? get(t, 'amountInHostCurrency.value', 0) : ''),
  paymentProcessorFee: (t) => get(t, 'paymentProcessorFee.value', 0),
  platformFee: (t) => get(t, 'platformFee.value', 0),
  hostFee: (t) => get(t, 'hostFee.value', 0),
  netAmount: (t) => get(t, 'netAmountInHostCurrency.value', 0),
  balance: (t) => get(t, 'balanceInHostCurrency.value'),
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
  expenseTags: (t) => get(t, 'expense.tags', []).join(', '),
  payoutMethodType: (t) => get(t, 'expense.payoutMethod.type'),
  merchantId: (t) => get(t, 'merchantId'),
  orderMemo: (t) => get(t, 'order.memo'),
  orderProcessedDate: (t) => (t.order?.processedAt ? moment.utc(t.order.processedAt).format('YYYY-MM-DD') : ''),
  orderCustomData: (t) => get(t, 'order.customData'),
  taxAmount: (t) => get(t, 'taxAmount.value', 0),
  taxType: (t) => get(t, 'taxInfo.type'),
  taxRate: (t) => get(t, 'taxInfo.rate'),
  taxIdNumber: (t) => get(t, 'taxInfo.idNumber'),
  refundLegacyId: (t) => get(t, 'refundTransaction.legacyId', ''),
  expenseTotalAmount: (t) => get(t, 'expense.amount.value'),
  expenseCurrency: (t) => get(t, 'expense.amount.currency'),
  expenseSubmittedByHandle: (t) => get(t, 'expense.createdByAccount.slug'),
  expenseApprovedByHandle: (t) =>
    get(t, 'expense.approvedBy', [])
      ?.map((a) => a.slug)
      .join(' '),
  expensePaidByHandle: (t) => get(t, 'expense.paidBy.slug'),
};

const allKinds = [
  'ADDED_FUNDS',
  'BALANCE_TRANSFER',
  'CONTRIBUTION',
  'EXPENSE',
  'HOST_FEE',
  'HOST_FEE_SHARE',
  'HOST_FEE_SHARE_DEBT',
  'PAYMENT_PROCESSOR_COVER',
  'PAYMENT_PROCESSOR_FEE',
  'PAYMENT_PROCESSOR_DISPUTE_FEE',
  'PLATFORM_FEE',
  'PLATFORM_TIP',
  'PLATFORM_TIP_DEBT',
  'PREPAID_PAYMENT_METHOD',
  'TAX',
];

const allFields = Object.keys(csvMapping);

const defaultFields = [
  'datetime',
  'shortId',
  'shortGroup',
  'description',
  'type',
  'kind',
  'isRefund',
  'isRefunded',
  'shortRefundId',
  'displayAmount',
  'amount',
  'paymentProcessorFee',
  'hostFee',
  'netAmount',
  'balance',
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
  'expenseTags',
  'payoutMethodType',
  // Extra fields
  'merchantId',
  'orderMemo',
  'orderProcessedDate',
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

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const accountTransactions = async (req, res) => {
  if (!['HEAD', 'GET'].includes(req.method)) {
    return res.status(405).send({ error: { message: 'Method not allowed' } });
  }

  const variables = pick({ ...req.params, ...req.query }, [
    'account',
    'slug',
    'limit',
    'offset',
    'type',
    'kind',
    'dateFrom',
    'dateTo',
    'minAmount',
    'maxAmount',
    'paymentMethodType',
    'searchTerm',
    'includeIncognitoTransactions',
    'includeChildrenTransactions',
    'includeGiftCardTransactions',
    'includeRegularTransactions',
    'includeHost',
  ]);
  variables.limit =
    // If HEAD, we only want count, so we set limit to 0
    req.method === 'HEAD'
      ? 0
      : // Else, we use the limit provided by the user, or default to 1000
        variables.limit
        ? Number(variables.limit)
        : 1000;
  variables.offset = Number(variables.offset) || 0;

  if (variables.account) {
    variables.account = variables.account.split(',').map((slug) => ({ slug }));
  }

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
  if (variables.clearedFrom) {
    variables.clearedFrom = moment.utc(variables.clearedFrom).toISOString();
  }
  if (variables.clearedTo) {
    // Detect short form (e.g: 2021-08-30)
    const shortDate = variables.clearedTo.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    variables.clearedTo = moment.utc(variables.clearedTo);
    // Extend to end of the day, 1 sec before midnight
    if (shortDate) {
      variables.clearedTo.set('hour', 23).set('minute', 59).set('second', 59);
    }
    variables.clearedTo = variables.clearedTo.toISOString();
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

  if (variables.paymentMethodType) {
    variables.paymentMethodType = variables.paymentMethodType.split(',').map(toUpper).map(trim);
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

  if (variables.includeHost) {
    variables.includeHost = parseToBooleanDefaultTrue(variables.includeHost);
  }

  variables.fetchHostFee = parseToBooleanDefaultFalse(req.query.flattenHostFee);
  if (variables.fetchHostFee) {
    variables.kind = difference(variables.kind || allKinds, ['HOST_FEE']);
  }

  variables.fetchPaymentProcessorFee = parseToBooleanDefaultFalse(req.query.flattenPaymentProcessorFee);
  if (variables.fetchPaymentProcessorFee) {
    variables.kind = difference(variables.kind || allKinds, ['PAYMENT_PROCESSOR_FEE']);
  }

  variables.fetchTax = parseToBooleanDefaultFalse(req.query.flattenTax);
  if (variables.fetchTax) {
    variables.kind = difference(variables.kind || allKinds, ['TAX']);
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

    const baseAllFields =
      req.params.reportType === 'hostTransactions' ? allFields.filter((field) => field !== 'balance') : allFields;

    let baseDefaultFields = defaultFields;
    if (!variables.fetchHostFee) {
      baseDefaultFields = baseDefaultFields.filter((field) => field !== 'hostFee');
    }
    if (!variables.fetchPaymentProcessorFee) {
      baseDefaultFields = baseDefaultFields.filter((field) => field !== 'paymentProcessorFee');
    }
    if (!variables.fetchTax) {
      // No need to remove taxAmount because it's not in the default fields
      // baseDefaultFields = baseDefaultFields.filter((field) => field !== 'taxAmount');
    }
    // Remove netAmount if not needed
    // For later
    // if (!variables.fetchPaymentProcessorFee && !variables.fetchTax) {
    //   baseDefaultFields = baseDefaultFields.filter((field) => field !== 'netAmount');
    // }
    fields = difference(intersection(baseAllFields, [...baseDefaultFields, ...add]), remove);
  }

  const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll);

  // Add fields info to the query, to prevent fetching what's not needed
  variables.hasAccountingCategoryField = fields.some((field) => field.startsWith('accountingCategory'));
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

    const query = req.params.reportType === 'hostTransactions' ? hostTransactionsQuery : transactionsQuery;

    let result = await graphqlRequest(query, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'txt':
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
        let filename =
          req.params.reportType === 'hostTransactions'
            ? `${variables.slug}-host-transactions`
            : `${variables.slug}-transactions`;
        if (variables.dateFrom) {
          const until = variables.dateTo || moment.utc().toISOString();
          filename += `-${variables.dateFrom.slice(0, 10)}-${until.slice(0, 10)}`;
        }
        filename += `.${req.params.format}`;
        res.append('Content-Disposition', `attachment; filename="${filename}"`);
        res.append('Access-Control-Expose-Headers', 'X-Exported-Rows');
        res.append('X-Exported-Rows', result.transactions.totalCount);
        if (req.method === 'HEAD') {
          return res.status(200).end();
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
      res.status(404).send('Not account found.');
    } else {
      logger.error(`Error while fetching collective transactions: ${err.message}`);
      if (res.headersSent) {
        res.end(`\nError while fetching account transactions.`);
      } else {
        res.status(400).send(`Error while fetching account transactions.`);
      }
    }
  }
};

export default accountTransactions;
