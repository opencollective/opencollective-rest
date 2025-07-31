import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

const validateContributor = (contributor) => {
  expect(contributor).toHaveProperty('account');
  expect(contributor).toHaveProperty('totalDonations');
  expect(contributor.account).toHaveProperty('name');
  expect(contributor.account).toHaveProperty('slug');
  expect(contributor.account).toHaveProperty('type');
  expect(contributor.totalDonations).toHaveProperty('value');
  expect(contributor.totalDonations).toHaveProperty('currency');
};

describe('account-contributors', () => {
  describe('Cache-Control', () => {
    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/contributors.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
    });

    test('is private if authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/contributors.json', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('no-cache');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });
  });

  describe('accountContributors', () => {
    test('return /v2/:slug/contributors.json', async () => {
      const result = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/contributors.json');
      expect(result.totalCount).toBeGreaterThan(0);
      expect(Array.isArray(result.nodes)).toBe(true);
      if (result.nodes.length > 0) {
        validateContributor(result.nodes[0]);
      }
    });
  });
});
