import { Parser, type ParserOptions } from '@json2csv/plainjs';
import type { RequestHandler } from 'express';
import gql from 'graphql-tag';
import { difference, get, head, intersection, isNil, pick, toUpper, trim } from 'lodash';
import moment from 'moment';

import { accountNameAndLegalName, amountAsString } from '../lib/formatting';
import { graphqlRequestWithRetry } from '../lib/graphql';
import {
  applyMapping,
  parseToBooleanDefaultFalse,
  parseToBooleanDefaultTrue,
  splitEnums,
  splitIds,
  validateParams,
} from '../lib/utils';
import { logger } from '../logger';

function json2csv(data: object, opts: ParserOptions) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

export const transactionsFragment = gql`
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
        ... on AccountWithParent {
          parent {
            id
            slug
            name
            legalName
            type
            ... on Individual {
              email
            }
          }
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
        ... on AccountWithParent {
          parent {
            id
            slug
            name
            legalName
            type
            ... on Individual {
              email
            }
          }
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
        fromAccount {
          id
          name
          location {
            address
            country
          }
        }
        accountingCategory @include(if: $hasAccountingCategoryField) {
          id
          code
          name
        }
        transactionImportRow @include(if: $hasTransactionImportRowField) {
          id
          sourceId
          description
          date
          rawValue
          transactionsImport {
            id
            name
          }
          amount {
            value
            currency
          }
        }
        manualPaymentProvider {
          id
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
        reference
        transferReference
        payeeLocation {
          address
          country
        }
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
        transactionImportRow @include(if: $hasTransactionImportRowField) {
          id
          sourceId
          description
          date
          rawValue
          amount {
            value
            currency
          }
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
        refundKind
      }
      refundKind
      merchantId
    }
  }
`;

/* $fetchHostFee seems not used but it is in fragment */

const transactionsQuery = gql`
  query AccountTransactions(
    $accountingCategory: [String]
    $clearedFrom: DateTime
    $clearedTo: DateTime
    $dateFrom: DateTime
    $dateTo: DateTime
    $excludeAccount: [AccountReferenceInput!]
    $expense: ExpenseReferenceInput
    $expenseType: [ExpenseType]
    $fetchHostFee: Boolean
    $fetchPaymentProcessorFee: Boolean
    $fetchTax: Boolean
    $fullDescription: Boolean
    $group: [String]
    $hasAccountingCategoryField: Boolean!
    $hasTransactionImportRowField: Boolean!
    $includeChildrenTransactions: Boolean
    $includeGiftCardTransactions: Boolean
    $includeIncognitoTransactions: Boolean
    $includeRegularTransactions: Boolean
    $isRefund: Boolean
    $kind: [TransactionKind]
    $limit: Int
    $maxAmount: Int
    $merchantId: [String]
    $minAmount: Int
    $offset: Int
    $order: OrderReferenceInput
    $manualPaymentProvider: [ManualPaymentProviderReferenceInput!]
    $paymentMethodService: [PaymentMethodService]
    $paymentMethodType: [PaymentMethodType]
    $searchTerm: String
    $slug: String
    $type: TransactionType
  ) {
    transactions(
      account: { slug: $slug }
      accountingCategory: $accountingCategory
      clearedFrom: $clearedFrom
      clearedTo: $clearedTo
      dateFrom: $dateFrom
      dateTo: $dateTo
      excludeAccount: $excludeAccount
      expense: $expense
      expenseType: $expenseType
      group: $group
      includeChildrenTransactions: $includeChildrenTransactions
      includeDebts: true
      includeGiftCardTransactions: $includeGiftCardTransactions
      includeIncognitoTransactions: $includeIncognitoTransactions
      includeRegularTransactions: $includeRegularTransactions
      isRefund: $isRefund
      kind: $kind
      limit: $limit
      manualPaymentProvider: $manualPaymentProvider
      maxAmount: $maxAmount
      merchantId: $merchantId
      minAmount: $minAmount
      offset: $offset
      order: $order
      paymentMethodService: $paymentMethodService
      paymentMethodType: $paymentMethodType
      searchTerm: $searchTerm
      type: $type
    ) {
      ...TransactionsFragment
    }
  }
  ${transactionsFragment}
`;

const hostTransactionsQuery = gql`
  query HostTransactions(
    $account: [AccountReferenceInput!]
    $accountingCategory: [String]
    $clearedFrom: DateTime
    $clearedTo: DateTime
    $dateFrom: DateTime
    $dateTo: DateTime
    $excludeAccount: [AccountReferenceInput!]
    $expense: ExpenseReferenceInput
    $expenseType: [ExpenseType]
    $fetchHostFee: Boolean
    $fetchPaymentProcessorFee: Boolean
    $fetchTax: Boolean
    $fullDescription: Boolean
    $group: [String]
    $hasAccountingCategoryField: Boolean!
    $hasTransactionImportRowField: Boolean!
    $includeChildrenTransactions: Boolean
    $includeHost: Boolean
    $isRefund: Boolean
    $hasDebt: Boolean
    $kind: [TransactionKind]
    $limit: Int
    $maxAmount: Int
    $merchantId: [String]
    $minAmount: Int
    $offset: Int
    $order: OrderReferenceInput
    $manualPaymentProvider: [ManualPaymentProviderReferenceInput!]
    $paymentMethodService: [PaymentMethodService]
    $paymentMethodType: [PaymentMethodType]
    $searchTerm: String
    $slug: String
    $type: TransactionType
  ) {
    transactions(
      account: $account
      accountingCategory: $accountingCategory
      clearedFrom: $clearedFrom
      clearedTo: $clearedTo
      dateFrom: $dateFrom
      dateTo: $dateTo
      excludeAccount: $excludeAccount
      expense: $expense
      expenseType: $expenseType
      group: $group
      host: { slug: $slug }
      includeChildrenTransactions: $includeChildrenTransactions
      includeDebts: true
      includeHost: $includeHost
      isRefund: $isRefund
      hasDebt: $hasDebt
      kind: $kind
      limit: $limit
      manualPaymentProvider: $manualPaymentProvider
      maxAmount: $maxAmount
      merchantId: $merchantId
      minAmount: $minAmount
      offset: $offset
      order: $order
      paymentMethodService: $paymentMethodService
      paymentMethodType: $paymentMethodType
      searchTerm: $searchTerm
      type: $type
    ) {
      ...TransactionsFragment
    }
  }
  ${transactionsFragment}
`;

const getAccountingCategory = (transaction) => {
  return get(transaction, 'expense.accountingCategory') || get(transaction, 'order.accountingCategory');
};

const columnNames = {
  datetime: 'Date & Time',
  effectiveDate: 'Effective Date & Time',
  legacyId: 'Transaction ID',
  group: 'Group ID',
  description: 'Description',
  type: 'Credit/Debit',
  kind: 'Kind',
  netAmount: 'Amount Single Column',
  debitAndCreditAmounts: 'Amount Debit/Credit Columns',
  currency: 'Currency',
  displayAmount: 'Original Currency Amount',
  isReverse: 'Is Reverse',
  isReversed: 'Is Reversed',
  accountingCategoryCode: 'Accounting Category Code',
  accountingCategoryName: 'Accounting Category Name',
  merchantId: 'Merchant ID',
  paymentMethodService: 'Payment Processor',
  paymentMethodType: 'Payment Method',
  accountSlug: 'Account Handle',
  accountName: 'Account Name',
  accountType: 'Account Type',
  accountEmail: 'Account Email',
  oppositeAccountSlug: 'Opposite Account Handle',
  oppositeAccountName: 'Opposite Account Name',
  oppositeAccountType: 'Opposite Account Type',
  oppositeAccountEmail: 'Opposite Account Email',
  parentAccountSlug: 'Parent Account Handle',
  parentAccountName: 'Parent Account Name',
  parentAccountType: 'Parent Account Type',
  parentAccountEmail: 'Parent Account Email',
  oppositeParentAccountSlug: 'Opposite Parent Account Handle',
  oppositeParentAccountName: 'Opposite Parent Account Name',
  oppositeParentAccountType: 'Opposite Parent Account Type',
  oppositeParentAccountEmail: 'Opposite Parent Account Email',
  orderLegacyId: 'Contribution ID',
  orderMemo: 'Contribution Memo',
  orderFrequency: 'Contribution Frequency',
  orderCustomData: 'Contribution Custom Data',
  orderContributorAddress: 'Contributor Address',
  orderContributorCountry: 'Contributor Country',
  expenseLegacyId: 'Expense ID',
  expenseType: 'Expense Type',
  expenseTags: 'Expense Tags',
  taxType: 'Tax Type',
  taxRate: 'Tax Rate',
  taxIdNumber: 'Tax ID Number',
  date: 'Date',
  id: 'Transaction GraphQL ID',
  shortId: 'Short Transaction ID',
  shortGroup: 'Short Group ID',
  amount: 'Gross Amount',
  paymentProcessorFee: 'Payment Processor Fee',
  expenseId: 'Expense GraphQL ID',
  payoutMethodType: 'Expense Payout Method Type',
  platformFee: 'Platform Fee',
  hostFee: 'Host Fee',
  orderId: 'Contribution GraphQL ID',
  reverseLegacyId: 'Reverse Transaction ID',
  reverseKind: 'Reverse Kind',
  expenseTotalAmount: 'Expense Total Amount',
  expenseCurrency: 'Expense Currency',
  expenseSubmittedByHandle: 'Expense Submitted By Handle',
  expenseApprovedByHandle: 'Expense Approved By Handle',
  expensePaidByHandle: 'Expense Paid By Handle',
  expenseReference: 'Expense Reference Number',
  expenseTransferReference: 'Expense Transfer Reference',
  expensePayeeAddress: 'Payee Address',
  expensePayeeCountry: 'Payee Country',
  importSourceName: 'Import Source Name',
  importSourceId: 'Import Source ID',
  importSourceDescription: 'Import Source Description',
  importSourceAmount: 'Import Source Amount',
  importSourceDate: 'Import Source Date',
  importSourceData: 'Import Source Data',
  shortRefundId: 'Short Refund Transaction ID',
  refundLegacyId: 'Refund Transaction ID',
  refundId: 'Refund ID',
  isRefund: 'Is Refund',
  isRefunded: 'Is Refunded',
  balance: 'Balance',
  hostSlug: 'Host Handle',
  hostName: 'Host Name',
  hostType: 'Host Type',
  orderProcessedDate: 'Contribution Processed Date',
  taxAmount: 'Tax Amount',
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
  refundLegacyId: (t) => get(t, 'refundTransaction.legacyId', ''),
  refundKind: 'refundKind',
  isReverse: (t) => (t.isRefund ? 'REVERSE' : ''),
  isReversed: (t) => (t.isRefunded ? 'REVERSED' : ''),
  reverseId: (t) => get(t, 'refundTransaction.id', ''),
  reverseLegacyId: (t) => get(t, 'refundTransaction.legacyId', ''),
  reverseKind: 'refundKind',
  displayAmount: (t) => amountAsString(t.amount),
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
  accountName: (t) => accountNameAndLegalName(t.account),
  accountType: (t) => get(t, 'account.type'),
  accountEmail: (t) => get(t, 'account.email'),
  oppositeAccountSlug: (t) => get(t, 'oppositeAccount.slug'),
  oppositeAccountName: (t) => accountNameAndLegalName(t.oppositeAccount),
  oppositeAccountType: (t) => get(t, 'oppositeAccount.type'),
  oppositeAccountEmail: (t) => get(t, 'oppositeAccount.email'),
  parentAccountSlug: (t) => get(t, 'account.parent.slug'),
  parentAccountName: (t) => accountNameAndLegalName(t.account?.parent),
  parentAccountType: (t) => get(t, 'account.parent.type'),
  parentAccountEmail: (t) => get(t, 'account.parent.email'),
  oppositeParentAccountSlug: (t) => get(t, 'oppositeAccount.parent.slug'),
  oppositeParentAccountName: (t) => accountNameAndLegalName(t.oppositeAccount?.parent),
  oppositeParentAccountType: (t) => get(t, 'oppositeAccount.parent.type'),
  oppositeParentAccountEmail: (t) => get(t, 'oppositeAccount.parent.email'),
  hostSlug: (t) => get(t, 'host.slug'),
  hostName: (t) => accountNameAndLegalName(t.host),
  hostType: (t) => get(t, 'host.type'),
  orderId: (t) => get(t, 'order.id'),
  orderLegacyId: (t) => get(t, 'order.legacyId'),
  orderFrequency: (t) => get(t, 'order.frequency'),
  orderContributorAddress: (t) => get(t, 'order.fromAccount.location.address'),
  orderContributorCountry: (t) => get(t, 'order.fromAccount.location.country'),
  paymentMethodService: (t) => {
    const pmService = get(t, 'paymentMethod.service');
    if (pmService) {
      return pmService;
    }

    const manualProvider = get(t, 'order.manualPaymentProvider');
    return manualProvider ? 'opencollective' : undefined;
  },
  paymentMethodType: (t) => {
    const pmType = get(t, 'paymentMethod.type');
    if (pmType) {
      return pmType;
    }

    const manualProvider = get(t, 'order.manualPaymentProvider');
    const providerShortId = manualProvider ? `mp-${manualProvider.id.split('-')[0]}` : undefined;
    return manualProvider ? `Manual: ${manualProvider.name} (#${providerShortId})` : undefined;
  },
  expenseId: (t) => get(t, 'expense.id'),
  expenseLegacyId: (t) => get(t, 'expense.legacyId'),
  expenseType: (t) => get(t, 'expense.type'),
  expenseTags: (t) => get(t, 'expense.tags', []).join(', '),
  expensePayeeAddress: (t) => get(t, 'expense.payeeLocation.address'),
  expensePayeeCountry: (t) => get(t, 'expense.payeeLocation.country'),
  payoutMethodType: (t) => get(t, 'expense.payoutMethod.type'),
  merchantId: (t) => get(t, 'merchantId'),
  orderMemo: (t) => get(t, 'order.memo'),
  orderProcessedDate: (t) => (t.order?.processedAt ? moment.utc(t.order.processedAt).format('YYYY-MM-DD') : ''),
  orderCustomData: (t) => get(t, 'order.customData'),
  taxAmount: (t) => get(t, 'taxAmount.value', 0),
  taxType: (t) => get(t, 'taxInfo.type'),
  taxRate: (t) => get(t, 'taxInfo.rate'),
  taxIdNumber: (t) => get(t, 'taxInfo.idNumber'),
  expenseTotalAmount: (t) => get(t, 'expense.amount.value'),
  expenseCurrency: (t) => get(t, 'expense.amount.currency'),
  expenseSubmittedByHandle: (t) => get(t, 'expense.createdByAccount.slug'),
  expenseApprovedByHandle: (t) =>
    get(t, 'expense.approvedBy', [])
      ?.map((a) => a.slug)
      .join(' '),
  expensePaidByHandle: (t) => get(t, 'expense.paidBy.slug'),
  expenseReference: (t) => get(t, 'expense.reference'),
  expenseTransferReference: (t) => get(t, 'expense.transferReference'),
  // Transactions import
  importSourceName: (t) => get(getTransactionImportRowFromTransaction(t), 'transactionsImport.name'),
  importSourceId: (t) => get(getTransactionImportRowFromTransaction(t), 'sourceId'),
  importSourceDescription: (t) => get(getTransactionImportRowFromTransaction(t), 'description'),
  importSourceAmount: (t) => get(getTransactionImportRowFromTransaction(t), 'amount.value'),
  importSourceDate: (t) => get(getTransactionImportRowFromTransaction(t), 'date'),
  importSourceData: (t) => get(getTransactionImportRowFromTransaction(t), 'rawValue'),
};

const getTransactionImportRowFromTransaction = (transaction) => {
  return get(transaction, 'expense.transactionImportRow') || get(transaction, 'order.transactionImportRow');
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
  'refundKind',
];

type Params = {
  slug: string;
  reportType: 'hostTransactions' | 'transactions';
  type?: 'credit' | 'debit';
  kind?: string;
  format: 'json' | 'csv' | 'txt';
};

const accountTransactions: RequestHandler<Params> = async (req, res) => {
  if (!['HEAD', 'GET'].includes(req.method)) {
    res.status(405).send({ error: { message: 'Method not allowed' } });
    return;
  }

  const paramsError = validateParams(req.params, {
    reportType: ['hostTransactions', 'transactions'],
    type: ['credit', 'debit'],
    kind: [
      'contribution',
      'expense',
      'added_funds',
      'host_fee',
      'host_fee_share',
      'host_fee_share_debt',
      'platform_tip',
      'platform_tip_debt',
    ],
    format: ['json', 'csv', 'txt'],
  });
  if (paramsError) {
    res.status(400).send({ error: { message: paramsError } });
    return;
  }

  const variables: any = pick({ ...req.params, ...req.query }, [
    'account',
    'accountingCategory',
    'dateFrom',
    'dateTo',
    'clearedFrom',
    'clearedTo',
    'excludeAccount',
    'expenseId',
    'expenseType',
    'group',
    'hasDebt',
    'includeChildrenTransactions',
    'includeGiftCardTransactions',
    'includeHost',
    'includeIncognitoTransactions',
    'includeRegularTransactions',
    'isRefund',
    'kind',
    'limit',
    'maxAmount',
    'merchantId',
    'minAmount',
    'offset',
    'orderId',
    'manualPaymentProvider',
    'paymentMethodService',
    'paymentMethodType',
    'searchTerm',
    'slug',
    'type',
    'useFieldNames',
  ]);

  const useFieldNames =
    variables.useFieldNames === '1' || variables.useFieldNames === true || variables.useFieldNames === 'true';

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
  if (variables.excludeAccount) {
    variables.excludeAccount = variables.excludeAccount.split(',').map((slug) => ({ slug }));
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
    variables.kind = splitEnums(variables.kind);
  }
  if (variables.paymentMethodService) {
    variables.paymentMethodService = splitEnums(variables.paymentMethodService);
  }
  if (variables.paymentMethodType) {
    variables.paymentMethodType = splitEnums(variables.paymentMethodType);
  }
  if (variables.manualPaymentProvider && typeof variables.manualPaymentProvider === 'string') {
    variables.manualPaymentProvider = splitIds(variables.manualPaymentProvider).map((id) => ({ id }));
  }

  if (variables.group) {
    variables.group = splitIds(variables.group);
  }
  if (variables.merchantId) {
    variables.merchantId = splitIds(variables.merchantId);
  }
  if (variables.accountingCategory) {
    variables.accountingCategory = splitIds(variables.accountingCategory);
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

  variables.fetchHostFee = parseToBooleanDefaultFalse(req.query.flattenHostFee as string);
  if (variables.fetchHostFee) {
    variables.kind = difference(variables.kind || allKinds, ['HOST_FEE']);
  }

  variables.fetchPaymentProcessorFee = parseToBooleanDefaultFalse(req.query.flattenPaymentProcessorFee as string);
  if (variables.fetchPaymentProcessorFee) {
    variables.kind = difference(variables.kind || allKinds, ['PAYMENT_PROCESSOR_FEE']);
  }

  variables.fetchTax = parseToBooleanDefaultFalse(req.query.flattenTax as string);
  if (variables.fetchTax) {
    variables.kind = difference(variables.kind || allKinds, ['TAX']);
  }

  if (variables.expenseType) {
    variables.expenseType = splitEnums(variables.expenseType);
  }

  if (variables.orderId) {
    variables.order = { legacyId: parseInt(variables.orderId) };
  }

  if (variables.expenseId) {
    variables.expense = { legacyId: parseInt(variables.expenseId) };
  }

  // isRefund can be false but default should be undefined
  if (!isNil(variables.isRefund)) {
    variables.isRefund = parseToBooleanDefaultFalse(variables.isRefund);
  }

  // hasDebt can be false but default should be undefined
  if (!isNil(variables.hasDebt)) {
    variables.hasDebt = parseToBooleanDefaultFalse(variables.hasDebt);
  }

  if (req.query.fullDescription) {
    variables.fullDescription = parseToBooleanDefaultFalse(req.query.fullDescription as string);
  } else {
    variables.fullDescription = req.params.reportType === 'hostTransactions' ? true : false;
  }

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

  const fetchAll = variables.offset ? false : parseToBooleanDefaultFalse(req.query.fetchAll as string);

  // Add fields info to the query, to prevent fetching what's not needed
  variables.hasAccountingCategoryField = fields.some((field) => field.startsWith('accountingCategory'));
  variables.hasTransactionImportRowField = fields.some((field) => field.startsWith('importSource'));

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

    let result = await graphqlRequestWithRetry(query, variables, { version: 'v2', headers });

    switch (req.params.format) {
      case 'txt':
      case 'csv': {
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
          res.status(200).end();
          return;
        }

        const exportFields = useFieldNames
          ? fields.map((field) => ({ label: columnNames[field] || field, value: field }))
          : fields;

        if (result.transactions.totalCount === 0) {
          res.write(json2csv([], { fields: exportFields }));
          res.write(`\n`);
          res.end();
          return;
        }

        const mapping = pick(csvMapping, fields);

        const mappedTransactions = result.transactions.nodes.map((t) => applyMapping(mapping, t));
        res.write(json2csv(mappedTransactions, { fields: exportFields }));
        res.write(`\n`);

        if (result.transactions.totalCount > result.transactions.limit) {
          if (fetchAll) {
            do {
              variables.offset += result.transactions.limit;

              result = await graphqlRequestWithRetry(query, variables, { version: 'v2', headers });

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
      if (err.networkError?.result?.errors?.length) {
        logger.debug(JSON.stringify(err.networkError.result.errors, null, 2));
      }

      if (res.headersSent) {
        res.end(`\nError while fetching account transactions.`);
      } else {
        res.status(400).send(`Error while fetching account transactions.`);
      }
    }
  }
};

export default accountTransactions;
