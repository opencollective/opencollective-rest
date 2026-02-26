import { fetchJsonWithCacheBurst, fetchResponseWithCacheBurst, generateJWT } from '../../utils';

const validateMember = (member) => {
  expect(member).toHaveProperty('MemberId');
  expect(member).toHaveProperty('name');
  expect(member).toHaveProperty('image');
  expect(member).toHaveProperty('twitter');
  expect(member).toHaveProperty('github');
  expect(member).toHaveProperty('website');
  expect(member).toHaveProperty('profile');
  expect(member).toHaveProperty('isActive');
  expect(member).toHaveProperty('lastTransactionAt');
  expect(member).toHaveProperty('lastTransactionAmount');
  expect(member).toHaveProperty('totalAmountDonated');
};

describe('members', () => {
  describe('Cache-Control', () => {
    test('is public if not authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl/members.json');
      expect(response.headers['cache-control']).toEqual('public, max-age=60');
    });

    test('is private if authenticated', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl/members.json', {
        headers: { Authorization: `Bearer ${generateJWT()}` },
      });
      expect(response.headers['cache-control']).toEqual('no-cache');
      expect(response.headers['pragma']).toEqual('no-cache');
      expect(response.headers['expires']).toEqual('0');
    });
  });

  describe('base', () => {
    test('return /:collectiveSlug/members.json', async () => {
      const members = await fetchJsonWithCacheBurst('/railsgirlsatl/members.json');
      expect(members.length).toBeGreaterThan(5);
      validateMember(members[0]);
    });

    test('return /:collectiveSlug/members/organizations.json', async () => {
      const organizations = await fetchJsonWithCacheBurst('/railsgirlsatl/members/organizations.json');
      expect(organizations.length).toBeGreaterThan(2);
      validateMember(organizations[0]);
      expect(organizations[0].type).toEqual('ORGANIZATION');
      expect(organizations[1].type).toEqual('ORGANIZATION');
    });
  });

  describe('param validation', () => {
    test('returns 404 for unsupported format', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl/members.xml');
      expect(response.statusCode).toBe(404);
    });

    test('returns 404 for invalid backerType', async () => {
      const response = await fetchResponseWithCacheBurst('/railsgirlsatl/members/invalid.json');
      expect(response.statusCode).toBe(404);
    });

    test('returns 404 for invalid event role', async () => {
      const response = await fetchResponseWithCacheBurst('/veganizerbxl/events/superfilles/invalid.json');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('for event', () => {
    test('return /:collectiveSlug/events/:eventSlug/attendees.json', async () => {
      const attendees = await fetchJsonWithCacheBurst('/veganizerbxl/events/superfilles/attendees.json');
      validateMember(attendees[0]);
      expect(attendees[0].role).toEqual('ATTENDEE');
      expect(attendees[1].role).toEqual('ATTENDEE');
    });

    test('return /:collectiveSlug/events/:eventSlug/followers.json', async () => {
      const followers = await fetchJsonWithCacheBurst('/veganizerbxl/events/superfilles/followers.json');
      validateMember(followers[0]);
      expect(followers[0].role).toEqual('FOLLOWER');
      expect(followers[1].role).toEqual('FOLLOWER');
    });
  });
});
