import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

const validateOrder = (order) => {
  expect(order).toHaveProperty('fromAccount');
  expect(order).toHaveProperty('amount');
  expect(order).toHaveProperty('frequency');
  expect(order).toHaveProperty('status');
  expect(order).toHaveProperty('totalDonations');
  expect(order).toHaveProperty('createdAt');
};

describe('account-orders', () => {
  describe('Cache-Control', () => {
    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/orders');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
    });

    test('is private if authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/orders', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('no-cache');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });
  });

  describe('accountOrders', () => {
    test('return /v2/:slug/orders', async () => {
      const orders = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/orders');
      expect(orders).toHaveProperty('limit');
      expect(orders).toHaveProperty('offset');
      expect(orders).toHaveProperty('totalCount');
      expect(orders).toHaveProperty('nodes');
      expect(Array.isArray(orders.nodes)).toBe(true);
      if (orders.nodes.length > 0) {
        validateOrder(orders.nodes[0]);
      }
    });

    test('return /v2/:slug/orders/incoming', async () => {
      const orders = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/orders/incoming');
      expect(orders).toHaveProperty('nodes');
      expect(Array.isArray(orders.nodes)).toBe(true);
    });

    test('return /v2/:slug/orders/outgoing', async () => {
      const orders = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/orders/outgoing');
      expect(orders).toHaveProperty('nodes');
      expect(Array.isArray(orders.nodes)).toBe(true);
    });

    test('return /v2/:slug/orders/incoming/active', async () => {
      const orders = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/orders/incoming/active');
      expect(orders).toHaveProperty('nodes');
      expect(Array.isArray(orders.nodes)).toBe(true);
    });

    describe('tier orders', () => {
      test('return /v2/:slug/tier/:tierSlug/orders', async () => {
        const orders = await fetchJsonWithCacheBurst('/v2/railsgirlsatl/tier/backers/orders');
        expect(orders).toHaveProperty('nodes');
        expect(Array.isArray(orders.nodes)).toBe(true);
      });

      test('return 404 if tier does not exists', async () => {
        const response = await fetchResponseWithCacheBurst('/v2/railsgirlsatl/tier/backers-not-exists/orders');
        expect(response.statusCode).toBe(400); // TODO: should be 404
      });
    });
  });
});
