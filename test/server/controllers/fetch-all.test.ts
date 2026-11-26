import * as graphqlLib from '../../../src/server/lib/graphql';
import { fetchResponseWithCacheBurst } from '../../utils';

// These tests mock the GraphQL layer, they don't need the API to be running
const lines = (payload: string) => payload.split(/\r?\n/).filter(Boolean);

describe('fetchAll', () => {
  describe('account-transactions', () => {
    let spy: jest.SpiedFunction<typeof graphqlLib.graphqlRequestWithRetry>;

    beforeEach(() => {
      spy = jest.spyOn(graphqlLib, 'graphqlRequestWithRetry');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('does not loop forever when the limit is 0', async () => {
      spy.mockResolvedValue({ transactions: { limit: 0, offset: 0, totalCount: 5, nodes: [] } });
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/transactions.csv?fetchAll=true&limit=0&fields=legacyId',
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(response.payload).toContain('Warning: totalCount is 5 and limit was 0');
    });

    it('fetches every page', async () => {
      spy
        .mockResolvedValueOnce({
          transactions: { limit: 2, offset: 0, totalCount: 3, nodes: [{ legacyId: 1 }, { legacyId: 2 }] },
        })
        .mockResolvedValueOnce({
          transactions: { limit: 2, offset: 2, totalCount: 3, nodes: [{ legacyId: 3 }] },
        });
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/transactions.csv?fetchAll=true&limit=2&fields=legacyId',
      );
      expect(spy).toHaveBeenCalledTimes(2);
      expect(lines(response.payload)).toEqual(['"legacyId"', '1', '2', '3']);
    });

    it('only returns the first page without fetchAll', async () => {
      spy.mockResolvedValue({
        transactions: { limit: 2, offset: 0, totalCount: 3, nodes: [{ legacyId: 1 }, { legacyId: 2 }] },
      });
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/transactions.csv?limit=2&fields=legacyId');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(lines(response.payload)).toEqual(['"legacyId"', '1', '2', 'Warning: totalCount is 3 and limit was 2']);
    });
  });

  describe('account-contributors', () => {
    let spy: jest.SpiedFunction<typeof graphqlLib.graphqlRequest>;

    const page = (members: Record<string, unknown>) => ({ account: { id: 1, slug: 'railsgirlsatl', members } });

    beforeEach(() => {
      spy = jest.spyOn(graphqlLib, 'graphqlRequest');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('does not loop forever when the limit is 0', async () => {
      // A page with a limit of 0 and results can't be returned by the API, this checks the guard on its own
      spy.mockResolvedValue(page({ limit: 0, offset: 0, totalCount: 5, nodes: [{ account: { name: 'A' } }] }));
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/contributors.csv?fetchAll=true&limit=0&fields=contributorName',
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(response.payload).toContain('Warning: totalCount is 5 and limit was 0');
    });

    it('fetches every page', async () => {
      spy
        .mockResolvedValueOnce(
          page({
            limit: 2,
            offset: 0,
            totalCount: 3,
            nodes: [{ account: { name: 'A' } }, { account: { name: 'B' } }],
          }),
        )
        .mockResolvedValueOnce(page({ limit: 2, offset: 2, totalCount: 3, nodes: [{ account: { name: 'C' } }] }));
      const response = await fetchResponseWithCacheBurst(
        '/v2/railsgirlsatl/contributors.csv?fetchAll=true&limit=2&fields=contributorName',
      );
      expect(spy).toHaveBeenCalledTimes(2);
      expect(lines(response.payload)).toEqual(['"contributorName"', '"A"', '"B"', '"C"']);
    });
  });

  describe('hosted-collectives', () => {
    let spy: jest.SpiedFunction<typeof graphqlLib.graphqlRequest>;

    const hostResult = { host: { id: 'host-1', slug: 'host', currency: 'USD' } };
    const page = (hostedAccounts: Record<string, unknown>) => ({ host: { id: 'host-1', hostedAccounts } });

    beforeEach(() => {
      spy = jest.spyOn(graphqlLib, 'graphqlRequest');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('does not loop forever when the limit is 0', async () => {
      spy
        .mockResolvedValueOnce(hostResult)
        .mockResolvedValue(page({ limit: 0, offset: 0, totalCount: 5, nodes: [{ slug: 'a' }] }));
      const response = await fetchResponseWithCacheBurst(
        '/v2/host/hosted-collectives.csv?fetchAll=true&limit=0&fields=slug',
      );
      // One call for the host, one for the hosted accounts
      expect(spy).toHaveBeenCalledTimes(2);
      expect(response.payload).toContain('Warning: totalCount is 5 and limit was 0');
    });

    it('fetches every page', async () => {
      spy
        .mockResolvedValueOnce(hostResult)
        .mockResolvedValueOnce(page({ limit: 2, offset: 0, totalCount: 3, nodes: [{ slug: 'a' }, { slug: 'b' }] }))
        .mockResolvedValueOnce(page({ limit: 2, offset: 2, totalCount: 3, nodes: [{ slug: 'c' }] }));
      const response = await fetchResponseWithCacheBurst(
        '/v2/host/hosted-collectives.csv?fetchAll=true&limit=2&fields=slug',
      );
      expect(spy).toHaveBeenCalledTimes(3);
      expect(lines(response.payload)).toEqual(['"slug"', '"a"', '"b"', '"c"']);
    });
  });
});
