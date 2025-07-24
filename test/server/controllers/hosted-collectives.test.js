import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst } from '../../utils';

const validateHostedCollective = (collective) => {
  expect(collective).toHaveProperty('name');
  expect(collective).toHaveProperty('slug');
  expect(collective).toHaveProperty('type');
  expect(collective).toHaveProperty('currency');
  expect(collective).toHaveProperty('balance');
  expect(collective).toHaveProperty('status');
};

describe('hosted-collectives', () => {
  describe('Cache-Control', () => {
    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/hosted-collectives.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
    });

    test('is private if authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/hosted-collectives.json', {
        headers: { Authorization: 'Bearer 1234567890' },
      });
      expect(response.headers['cache-control']).toEqual('no-cache');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });
  });

  describe('hostedCollectives', () => {
    test('return /v2/:slug/hosted-collectives.json', async () => {
      const collectives = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/hosted-collectives.json');
      expect(collectives).toHaveProperty('limit');
      expect(collectives).toHaveProperty('offset');
      expect(collectives).toHaveProperty('totalCount');
      expect(collectives).toHaveProperty('nodes');
      expect(Array.isArray(collectives.nodes)).toBe(true);
      if (collectives.nodes.length > 0) {
        validateHostedCollective(collectives.nodes[0]);
      }
    });

    test('return /v2/:slug/hosted-collectives.csv', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/hosted-collectives.csv');
      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('attachment');
    });
  });
});
