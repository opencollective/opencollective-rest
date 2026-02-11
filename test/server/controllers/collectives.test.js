import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

const validateCollective = (collective) => {
  expect(collective).toHaveProperty('slug');
  expect(collective).toHaveProperty('currency');
  expect(collective).toHaveProperty('image');
  expect(collective).toHaveProperty('balance');
  expect(collective).toHaveProperty('yearlyIncome');
  expect(collective).toHaveProperty('backersCount');
  expect(collective).toHaveProperty('contributorsCount');
};

describe('collectives', () => {
  describe('Cache-Control', () => {
    test('is public with 1 hour max-age if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=3600');
    });

    test('is public when authenticated too (no private data)', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl.json', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('public, max-age=3600');
    });
  });

  describe('param validation', () => {
    test('returns 404 for unsupported format', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl.xml');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('info', () => {
    test('return /:collectiveSlug.json', async () => {
      const collective = await fetchJsonWithCacheBurst('/railsgirlsatl.json');
      validateCollective(collective);
    });

    test('return /v1/:collectiveSlug.json', async () => {
      const collective = await fetchJsonWithCacheBurst('/v1/railsgirlsatl.json');
      validateCollective(collective);
    });
  });
});
