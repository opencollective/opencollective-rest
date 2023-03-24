import fetch from 'node-fetch';

const REST_URL = process.env.REST_URL || 'https://rest.opencollective.com';

const cacheBurst = `cacheBurst=${Math.round(Math.random() * 100000)}`;

const fetchResponse = (path) => {
  const pathWithCacheBurst = [path, cacheBurst].join(path.indexOf('?') === -1 ? '?' : '&');
  return fetch(`${REST_URL}${pathWithCacheBurst}`);
};

const fetchJson = (path) => fetchResponse(path).then((response) => response.json());

const validateMember = (member) => {
  expect(member).toHaveProperty('email', null);
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

describe('api.json.test.js', () => {
  describe('collective', () => {
    test('return /:collectiveSlug.json', async () => {
      const collective = await fetchJson('/railsgirlsatl.json');
      expect(collective.slug).toEqual('railsgirlsatl');
      expect(collective.currency).toEqual('USD');
      expect(collective.balance).toBeGreaterThan(100);
      expect(collective.yearlyIncome).toBeGreaterThan(100);
      expect(collective.backersCount).toBeGreaterThan(1);
      expect(collective.contributorsCount).toEqual(0);
    });

    test('return /:collectiveSlug/members.json', async () => {
      const members = await fetchJson('/railsgirlsatl/members.json');
      expect(members.length).toBeGreaterThan(5);
      validateMember(members[0]);
    });

    test('return /:collectiveSlug/members/organizations.json', async () => {
      const organizations = await fetchJson('/railsgirlsatl/members/organizations.json');
      expect(organizations.length).toBeGreaterThan(2);
      validateMember(organizations[0]);
      expect(organizations[0].type).toEqual('ORGANIZATION');
      expect(organizations[1].type).toEqual('ORGANIZATION');
    });
  });

  describe.skip('old api', () => {
    describe('webpack', () => {
      test('return list of backers with proper website url', async () => {
        const backers = await fetchJson('/api/groups/railsgirlsatl/backers');
        backers.forEach((backer) => {
          if (!backer.website) {
            return;
          }
          expect(backer.website).toMatch(/^https?:\/\//);
        });
      });
    });
  });

  describe('event', () => {
    test('return /:collectiveSlug/events.json', async () => {
      const events = await fetchJson('/veganizerbxl/events.json');
      expect(events).toHaveLength(6);
      expect(events[0]).toEqual({
        id: 8722,
        name: 'Vegan Dining Week',
        description: null,
        slug: 'vegandiningweek-407ev',
        image: 'https://cl.ly/1G0T0G2c062b/Slice.png',
        startsAt: 'Fri Nov 10 2017 22:00:00 GMT+0000 (Coordinated Universal Time)',
        endsAt: 'Sat Nov 18 2017 22:00:00 GMT+0000 (Coordinated Universal Time)',
        timezone: 'Europe/Brussels',
        location: {
          name: 'Brussels',
          address: 'Brussels',
          lat: 50.8503396,
          long: 4.3517103,
        },
        url: 'https://opencollective.com/veganizerbxl/events/vegandiningweek-407ev',
        info: 'https://opencollective.com/veganizerbxl/events/vegandiningweek-407ev.json',
      });
    });

    test('return /:collectiveSlug/events/:eventSlug.json', async () => {
      const event = await fetchJson('/veganizerbxl/events/superfilles.json');
      expect(event).toEqual({
        id: 8716,
        name: 'Les Super Filles du Tram: Officially Veganized',
        description: null,
        longDescription:
          "<p>It is finally happening: Veganizer BXL is launching an incredibly tasty vegan burger, 100% plant-based and, in true Brussels style, infused with the bold flavor of Brussels Beer Project's Babylone beer! The seitan base is provided by a basis of Bertyn seitan. The hamburger bun prepared by Agribio's Laurent Pedrotti. For now, it will be exclusively available at the famous burger place Les Super Filles du Tram at Flagey. </p>\n" +
          '<p><img src="https://cl.ly/1M2f0N2K1W1I/veganizerbxl.jpg" /></p>\n' +
          '<p>The night of the event, orders can also be made through Deliveroo to have your burgers delivered at home in the Brussels area. </p>',
        slug: 'superfilles',
        image: 'https://cl.ly/1G0T0G2c062b/Slice.png',
        startsAt: 'Mon Apr 24 2017 17:00:00 GMT+0000 (Coordinated Universal Time)',
        endsAt: 'Mon Apr 24 2017 19:00:00 GMT+0000 (Coordinated Universal Time)',
        timezone: 'Europe/Brussels',
        location: {
          name: 'Les Super Filles du Tram',
          address: 'Rue Lesbroussart 22, 1050 Bruxelles',
          lat: 50.827697,
          long: 4.370636,
        },
        currency: 'EUR',
        tiers: [
          {
            id: 13,
            name: 'free ticket',
            description:
              'note: this is not an official reservation! First come, first serve. It is however a great way for us to get an idea of how many people will be attending. Plus, we will send you a little reminder before the event!',
            amount: 0,
          },
          {
            id: 19,
            name: 'supporter ticket',
            description: 'Support the VeganizerBXL collective. Your donations matter.',
            amount: 500,
          },
        ],
        url: 'https://opencollective.com/veganizerbxl/events/superfilles',
        attendees: 'https://opencollective.com/veganizerbxl/events/superfilles/attendees.json',
      });
    });

    test('return /:collectiveSlug/events/:eventSlug/attendees.json', async () => {
      const attendees = await fetchJson('/veganizerbxl/events/superfilles/attendees.json');
      validateMember(attendees[0]);
      expect(attendees[0].role).toEqual('ATTENDEE');
      expect(attendees[1].role).toEqual('ATTENDEE');
    });

    test('return /:collectiveSlug/events/:eventSlug/followers.json', async () => {
      const followers = await fetchJson('/veganizerbxl/events/superfilles/followers.json');
      validateMember(followers[0]);
      expect(followers[0].role).toEqual('FOLLOWER');
      expect(followers[1].role).toEqual('FOLLOWER');
    });

    // This test is broken beceause V1 API does not return the inherited ADMINs
    // The correct way to fix this is to migrate the V1 API to V2
    test.skip('return /:collectiveSlug/events/:eventSlug/organizers.json', async () => {
      const organizers = await fetchJson('/veganizerbxl/events/superfilles/organizers.json');
      validateMember(organizers[0]);
      expect(organizers[0].role).toEqual('ADMIN');
      expect(organizers[1].role).toEqual('ADMIN');
    });
  });
});
