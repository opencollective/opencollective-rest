import { inject } from 'light-my-request';

import app from '../../../src/server/app';
import { formatV1Date, mapCollectiveV2, mapEventV2 } from '../../../src/server/lib/accounts';
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

  test('mapEventV2 falls back to the parent image when the event has none, as v1 did', () => {
    const base = { legacyId: 1, name: 'E', slug: 'meetup', location: null, currency: 'USD' };
    const parent = { imageUrl: 'https://images.opencollective.com/coll/abc1234/logo.png' };
    expect(
      mapEventV2({ ...base, imageUrl: 'https://images.opencollective.com/meetup/logo.png', parent } as never).image,
    ).toBe(parent.imageUrl);
    expect(
      mapEventV2({ ...base, imageUrl: 'https://images.opencollective.com/meetup/def5678/logo.png', parent } as never)
        .image,
    ).toBe('https://images.opencollective.com/meetup/def5678/logo.png');
  });

  test('formatV1Date returns null for an invalid date', () => {
    expect(formatV1Date('not a date')).toBeNull();
  });
});

describe('not found', () => {
  beforeEach(() => jest.clearAllMocks());

  // Production v2 answers "No collective found with slug <slug>" for an unknown slug
  test.each([
    ['/unknown.json', 'No collective found with slug unknown'],
    ['/unknown/events/unknown.json', 'No collective found with slug unknown'],
    ['/unknown.json', 'Account Not Found'],
    ['/unknown/events/unknown.json', 'Account Not Found'],
  ])('%s returns 404 on "%s"', async (url, message) => {
    graphqlRequestMock.mockRejectedValue(new Error(message));
    const response = await inject(app, { url });
    expect(response.statusCode).toBe(404);
  });

  test.each(['/coll.json', '/coll/events/meetup.json'])(
    '%s does not turn other "Not Found" errors into a 404',
    async (url) => {
      graphqlRequestMock.mockRejectedValue(new Error('Host Not Found'));
      const response = await inject(app, { url });
      expect(response.statusCode).not.toBe(404);
    },
  );
});

describe('null values', () => {
  beforeEach(() => jest.clearAllMocks());

  test('mapCollectiveV2 keeps null amounts and handles missing stats', () => {
    const account = { legacyId: 1, slug: 'coll', imageUrl: null, currency: 'USD' } as const;
    expect(
      mapCollectiveV2({
        ...account,
        stats: { balance: { valueInCents: null }, yearlyBudget: { valueInCents: null }, contributorsCount: 3 },
      }),
    ).toEqual({
      id: 1,
      slug: 'coll',
      image: null,
      currency: 'USD',
      stats: { balance: null, backers: { all: 3 }, yearlyBudget: null },
    });
    expect(mapCollectiveV2({ ...account, stats: null }).stats).toEqual({
      balance: null,
      backers: { all: null },
      yearlyBudget: null,
    });
  });

  test('mapEventV2 drops null tiers and keeps null tier amounts', () => {
    const base = { legacyId: 1, slug: 'meetup', imageUrl: null, location: null, currency: 'USD' };
    const tiers = {
      nodes: [null, { legacyId: 5, name: 'Flexible', description: null, amount: { valueInCents: null } }],
    };
    expect(mapEventV2({ ...base, name: 'E', description: null, longDescription: null, tiers } as never).tiers).toEqual([
      { id: 5, name: 'Flexible', description: null, amount: null },
    ]);
    expect(mapEventV2({ ...base, tiers: { nodes: null } } as never).tiers).toEqual([]);
  });

  // A null account is turned into the error the controllers map to a 404
  test.each(['/unknown.json', '/unknown/events/unknown.json'])(
    '%s returns 404 when the account is null',
    async (url) => {
      graphqlRequestMock.mockResolvedValue({ account: null });
      const response = await inject(app, { url });
      expect(response.statusCode).toBe(404);
    },
  );
});
