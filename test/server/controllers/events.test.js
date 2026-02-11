import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst } from '../../utils';

const validateEvent = (event) => {
  expect(event).toHaveProperty('id');
  expect(event).toHaveProperty('name');
  expect(event).toHaveProperty('slug');
  expect(event).toHaveProperty('image');
  expect(event).toHaveProperty('startsAt');
  expect(event).toHaveProperty('endsAt');
  expect(event).toHaveProperty('timezone');
  expect(event).toHaveProperty('location');
  expect(event).toHaveProperty('currency');
  expect(event).toHaveProperty('tiers');
  expect(event).toHaveProperty('url');
  expect(event).toHaveProperty('attendees');
};

describe('events', () => {
  describe('Cache-Control', () => {
    test('is public with 10 minutes max-age', async () => {
      const response = await fetchResponseWithCacheBurst('/veganizerbxl/events/superfilles.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=600');
    });
  });

  describe('param validation', () => {
    test('returns 404 for unsupported format', async () => {
      const response = await fetchResponseWithCacheBurst('/veganizerbxl/events/superfilles.xml');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('info', () => {
    test('return /:collectiveSlug/events/:eventSlug.json', async () => {
      const event = await fetchJsonWithCacheBurst('/veganizerbxl/events/superfilles.json');
      validateEvent(event);
    });

    test('return /v1/:collectiveSlug/events/:eventSlug.json', async () => {
      const event = await fetchJsonWithCacheBurst('/v1/veganizerbxl/events/superfilles.json');
      validateEvent(event);
    });
  });
});
