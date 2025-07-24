import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

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
    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
    });

    test('is private if authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.json', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('no-cache');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
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
