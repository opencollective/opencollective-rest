import * as graphqlLib from '../../../src/server/lib/graphql';
import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

const mockTransactionsResult = {
  transactions: {
    limit: 100,
    offset: 0,
    totalCount: 0,
    nodes: [],
  },
};

const validateTransaction = (transaction) => {
  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('type');
  expect(transaction).toHaveProperty('kind');
  expect(transaction).toHaveProperty('amount');
  expect(transaction).toHaveProperty('createdAt');
  expect(transaction.amount).toHaveProperty('value');
  expect(transaction.amount).toHaveProperty('currency');
};

describe('account-transactions', () => {
  describe('Cache-Control', () => {
    let graphqlSpy;

    beforeEach(() => {
      graphqlSpy = jest.spyOn(graphqlLib, 'graphqlRequestWithRetry').mockResolvedValue(mockTransactionsResult);
    });

    afterEach(() => {
      graphqlSpy.mockRestore();
    });

    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
      expect(response.headers['vary']).toContain('Cookie');
    });

    test('is private if authenticated with Authorization header', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.json', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('private, no-store');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });

    test('is private if authenticated with authorization cookie', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.json', {
        headers: { cookie: `authorization="Bearer ${generateJWT()}"` },
      });
      expect(response.headers['cache-control']).toEqual('private, no-store');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });
  });

  describe('balance accounting category columns', () => {
    let graphqlSpy;

    const mockResultWithNode = {
      transactions: {
        limit: 100,
        offset: 0,
        totalCount: 1,
        nodes: [
          {
            id: 'uuid-1',
            legacyId: 1,
            publicId: 'txn_1',
            group: 'group-1-abcdef',
            type: 'DEBIT',
            kind: 'EXPENSE',
            description: 'Test transaction',
            createdAt: '2026-01-01T00:00:00Z',
            amount: { value: -10, currency: 'USD' },
            balanceAccountingCategory: { id: 'cat-1', publicId: 'acct_1', code: '1051', name: 'Mercury Checking' },
          },
        ],
      },
    };

    beforeEach(() => {
      graphqlSpy = jest.spyOn(graphqlLib, 'graphqlRequestWithRetry').mockResolvedValue(mockResultWithNode);
    });

    afterEach(() => {
      graphqlSpy.mockRestore();
    });

    test('are opt-in and map code/name from the transaction', async () => {
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/transactions.csv?fields=legacyId,balanceAccountingCategoryCode,balanceAccountingCategoryName',
      );
      const [, variables] = graphqlSpy.mock.calls[0];
      expect(variables.hasBalanceAccountingCategoryField).toBe(true);
      expect(response.payload).toContain('"balanceAccountingCategoryCode","balanceAccountingCategoryName"');
      expect(response.payload).toContain('"1051","Mercury Checking"');
    });

    test('are not fetched when not requested', async () => {
      await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.csv?fields=legacyId');
      const [, variables] = graphqlSpy.mock.calls[0];
      expect(variables.hasBalanceAccountingCategoryField).toBe(false);
    });
  });

  describe('accountTransactions', () => {
    test('return /v2/:slug/transactions.json', async () => {
      const transactions = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/transactions.json');
      expect(transactions).toHaveProperty('limit');
      expect(transactions).toHaveProperty('offset');
      expect(transactions).toHaveProperty('totalCount');
      expect(transactions).toHaveProperty('nodes');
      expect(Array.isArray(transactions.nodes)).toBe(true);
      if (transactions.nodes.length > 0) {
        validateTransaction(transactions.nodes[0]);
      }
    });

    test('return /v2/:slug/transactions.csv', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.csv');
      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('attachment');
    });

    test('return /v2/:slug/transactions.txt', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.txt');
      expect(response.headers['content-type']).toContain('text/plain');
      expect(response.headers['content-disposition']).toContain('attachment');
    });

    test('return /v2/:slug/transactions/credit.json', async () => {
      const transactions = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/transactions/credit.json');
      expect(transactions).toHaveProperty('nodes');
      expect(Array.isArray(transactions.nodes)).toBe(true);
    });

    test('return /v2/:slug/transactions/debit.json', async () => {
      const transactions = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/transactions/debit.json');
      expect(transactions).toHaveProperty('nodes');
      expect(Array.isArray(transactions.nodes)).toBe(true);
    });

    test('return /v2/:slug/transactions/credit/contribution.json', async () => {
      const transactions = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/transactions/credit/contribution.json');
      expect(transactions).toHaveProperty('nodes');
      expect(Array.isArray(transactions.nodes)).toBe(true);
    });

    test('return /v2/:slug/hostTransactions.json', async () => {
      const transactions = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/hostTransactions.json');
      expect(transactions).toHaveProperty('nodes');
      expect(Array.isArray(transactions.nodes)).toBe(true);
    });
  });
});
