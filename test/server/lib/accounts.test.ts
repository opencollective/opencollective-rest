import { inject } from 'light-my-request';

import app from '../../../src/server/app';
import { mapCollectiveV2, mapEventV2 } from '../../../src/server/lib/accounts';
import { graphqlRequest } from '../../../src/server/lib/graphql';

jest.mock('../../../src/server/lib/graphql', () => ({
  graphqlRequest: jest.fn(),
}));

const graphqlRequestMock = graphqlRequest as jest.Mock;

describe('v2 mapping', () => {
  test('mapCollectiveV2 returns the shape of the former v1 query', () => {
    expect(
      mapCollectiveV2({
        legacyId: 302,
        slug: 'webpack',
        imageUrl: 'https://images.opencollective.com/webpack/abc/logo.png',
        currency: 'USD',
        stats: {
          balance: { valueInCents: 9305646 },
          yearlyBudget: { valueInCents: 17103331 },
          contributorsCount: 3182,
        },
      }),
    ).toEqual({
      id: 302,
      slug: 'webpack',
      image: 'https://images.opencollective.com/webpack/abc/logo.png',
      currency: 'USD',
      stats: { balance: 9305646, backers: { all: 3182 }, yearlyBudget: 17103331 },
    });
  });

  test('mapEventV2 returns the shape of the former v1 query', () => {
    expect(
      mapEventV2({
        legacyId: 12,
        name: 'Meetup',
        description: 'Short',
        longDescription: '<p>Long</p>',
        slug: 'meetup',
        imageUrl: 'https://images.opencollective.com/meetup/abc/logo.png',
        startsAt: '2026-12-01T18:00:00.000Z',
        endsAt: '2026-12-01T20:00:00.000Z',
        timezone: 'Europe/Paris',
        location: { name: 'Hall', address: '1 rue X', lat: 48.8, long: 2.3 },
        currency: 'EUR',
        tiers: { nodes: [{ legacyId: 5, name: 'Ticket', description: 'Entry', amount: { valueInCents: 1500 } }] },
      }),
    ).toEqual({
      id: 12,
      name: 'Meetup',
      description: 'Short',
      longDescription: '<p>Long</p>',
      slug: 'meetup',
      image: 'https://images.opencollective.com/meetup/abc/logo.png',
      startsAt: 'Tue Dec 01 2026 18:00:00 GMT+0000 (Coordinated Universal Time)',
      endsAt: 'Tue Dec 01 2026 20:00:00 GMT+0000 (Coordinated Universal Time)',
      timezone: 'Europe/Paris',
      location: { name: 'Hall', address: '1 rue X', lat: 48.8, long: 2.3 },
      currency: 'EUR',
      tiers: [{ id: 5, name: 'Ticket', description: 'Entry', amount: 1500 }],
    });
  });

  test('mapEventV2 handles accounts that are not events (no dates, no tiers, no location)', () => {
    const event = mapEventV2({
      legacyId: 1,
      name: 'Collective',
      description: 'd',
      longDescription: null,
      slug: 'collective',
      imageUrl: null,
      location: null,
      currency: 'USD',
    } as never);
    expect(event).toMatchObject({ startsAt: null, endsAt: null, timezone: null, location: null, tiers: [] });
  });
});

describe('not found', () => {
  beforeEach(() => jest.clearAllMocks());

  test.each(['/unknown.json', '/unknown/events/unknown.json'])(
    '%s returns 404 on a v2 "Not Found" error',
    async (url) => {
      graphqlRequestMock.mockRejectedValue(new Error('Account Not Found'));
      const response = await inject(app, { url });
      expect(response.statusCode).toBe(404);
    },
  );
});
