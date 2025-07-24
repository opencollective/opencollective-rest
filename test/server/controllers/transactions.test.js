import { fetchResponseWithCacheBurst, generateJWT } from '../../utils';

describe('transactions', () => {
  describe('Cache-Control', () => {
    test('requires authentication', async () => {
      const response = await fetchResponseWithCacheBurst('/v1/collectives/railsgirlsatl/transactions');
      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe('public, max-age=60');
      expect(response.headers['vary']).toBe('Accept-Encoding, Authorization, Personal-Token, Api-Key');
    });

    test('is private when authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v1/collectives/railsgirlsatl/transactions', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe('no-cache');
    });
  });
});
