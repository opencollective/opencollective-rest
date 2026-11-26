import * as graphqlLib from '../../../src/server/lib/graphql';
import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst } from '../../utils';

// The GraphQL schemas mark most fields as nullable. These tests mock the GraphQL layer (no API needed) to check
// what the controllers do when they actually get null values.
describe('null results', () => {
  let requestSpy: jest.SpiedFunction<typeof graphqlLib.graphqlRequest>;
  let retrySpy: jest.SpiedFunction<typeof graphqlLib.graphqlRequestWithRetry>;

  beforeEach(() => {
    requestSpy = jest.spyOn(graphqlLib, 'graphqlRequest');
    retrySpy = jest.spyOn(graphqlLib, 'graphqlRequestWithRetry');
  });

  afterEach(() => {
    requestSpy.mockRestore();
    retrySpy.mockRestore();
  });

  describe('account-orders', () => {
    it('returns a 404 when the account is null', async () => {
      requestSpy.mockResolvedValue({ account: null });
      const response = await fetchResponseWithCacheBurst('/v2/unknown/orders');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('account-contributors', () => {
    it.each(['json', 'csv'])('returns a 404 when the account is null (%s)', async (format) => {
      requestSpy.mockResolvedValue({ account: null });
      const response = await fetchResponseWithCacheBurst(`/v2/unknown/contributors.${format}`);
      expect(response.statusCode).toBe(404);
      expect(response.payload).toEqual('Not account found.');
    });

    it('handles null pagination fields and nodes', async () => {
      requestSpy.mockResolvedValue({
        account: { id: 1, slug: 'a', members: { limit: null, offset: null, totalCount: null, nodes: null } },
      });
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/contributors.csv?fields=contributorName');
      expect(response.statusCode).toBe(200);
      expect(response.headers['x-exported-rows']).toEqual('0');
    });
  });

  describe('hosted-collectives', () => {
    it('returns a 404 when the host is null', async () => {
      requestSpy
        .mockResolvedValueOnce({ host: { id: 'host-1', slug: 'host', currency: 'USD' } })
        .mockResolvedValueOnce({ host: null });
      const response = await fetchResponseWithCacheBurst('/v2/host/hosted-collectives.json');
      expect(response.statusCode).toBe(404);
      expect(response.payload).toEqual('Host not found');
    });

    it('handles null values in the CSV mapping', async () => {
      requestSpy
        .mockResolvedValueOnce({ host: { id: 'host-1', slug: 'host', currency: 'USD' } })
        .mockResolvedValueOnce({
          host: {
            id: 'host-1',
            hostedAccounts: {
              limit: 100,
              offset: 0,
              totalCount: 2,
              nodes: [
                null,
                {
                  slug: 'collective',
                  stats: null,
                  admins: { totalCount: 1, nodes: [null, { account: null }] },
                  firstContributionReceived: { nodes: null },
                },
              ],
            },
          },
        });
      const response = await fetchResponseWithCacheBurst(
        '/v2/host/hosted-collectives.csv?fields=slug,balance,adminEmails,firstContributionDate',
      );
      expect(response.statusCode).toBe(200);
      // The null node is dropped, the null values are exported as empty cells
      expect(response.payload).toContain('"collective","","",""');
    });
  });

  describe('account-transactions', () => {
    it('handles null pagination fields and nodes', async () => {
      retrySpy.mockResolvedValue({ transactions: { limit: null, offset: null, totalCount: null, nodes: null } });
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.csv?fields=legacyId');
      expect(response.statusCode).toBe(200);
    });

    it('ignores null nodes', async () => {
      retrySpy.mockResolvedValue({
        transactions: { limit: 100, offset: 0, totalCount: 2, nodes: [null, { legacyId: 7 }] },
      });
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.csv?fields=legacyId');
      expect(response.payload.split(/\r?\n/).filter(Boolean)).toEqual(['"legacyId"', '7']);
    });

    it('exports an empty amount when the currency is null', async () => {
      retrySpy.mockResolvedValue({
        transactions: {
          limit: 100,
          offset: 0,
          totalCount: 1,
          nodes: [{ legacyId: 1, amount: { value: 10, currency: null } }],
        },
      });
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/transactions.csv?fields=legacyId,displayAmount',
      );
      expect(response.statusCode).toBe(200);
      expect(response.payload).toContain('1,""');
    });

    it('exports the parent account name when only some account types have a parent', async () => {
      retrySpy.mockResolvedValue({
        transactions: {
          limit: 100,
          offset: 0,
          totalCount: 2,
          nodes: [
            { legacyId: 1, account: { name: 'Event', parent: { name: 'Parent', legalName: null } } },
            { legacyId: 2, account: { name: 'Collective' } },
          ],
        },
      });
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/transactions.csv?fields=legacyId,parentAccountName',
      );
      expect(response.payload.split(/\r?\n/).filter(Boolean)).toEqual([
        '"legacyId","parentAccountName"',
        '1,"Parent"',
        '2,""',
      ]);
    });
  });

  describe('members', () => {
    it('returns a 404 when the collective is null', async () => {
      requestSpy.mockResolvedValue({ Collective: null });
      const response = await fetchResponseWithCacheBurst('/unknown/members.json');
      expect(response.statusCode).toBe(404);
    });

    it('returns an empty list for null members', async () => {
      requestSpy.mockResolvedValue({ Collective: { currency: 'USD', members: null } });
      expect(await fetchJsonWithCacheBurst('/railsgirlsatl/members.json')).toEqual([]);

      requestSpy.mockResolvedValue({ Collective: { currency: 'USD', members: [null] } });
      expect(await fetchJsonWithCacheBurst('/railsgirlsatl/members.json')).toEqual([]);
    });
  });
});
