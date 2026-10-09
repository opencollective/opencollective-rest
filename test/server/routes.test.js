import express from 'express';
import { inject } from 'light-my-request';

import { loadRoutes } from '../../src/server/routes';

jest.mock('../../src/server/controllers', () => {
  const handler = (controller) => (req, res) => res.json({ controller, params: req.params });
  return {
    collectives: { info: handler('collectives.info') },
    members: { list: handler('members.list') },
    events: { info: handler('events.info') },
    transactions: {
      allTransactions: handler('transactions.allTransactions'),
    },
    accountOrders: handler('accountOrders'),
    accountTransactions: handler('accountTransactions'),
    accountContributors: handler('accountContributors'),
    hostedCollectives: handler('hostedCollectives'),
  };
});

const v1Cases = [
  ['/example.json', 'collectives.info', { collectiveSlug: 'example', format: 'json' }],
  ['/example/events/meetup.json', 'events.info', { collectiveSlug: 'example', eventSlug: 'meetup', format: 'json' }],
];

for (const format of ['json', 'csv']) {
  v1Cases.push([`/example/members.${format}`, 'members.list', { collectiveSlug: 'example', format }]);
  for (const backerType of ['all', 'users', 'organizations']) {
    v1Cases.push(
      [`/example/members/${backerType}.${format}`, 'members.list', { collectiveSlug: 'example', backerType, format }],
      [
        `/example/tiers/backers/${backerType}.${format}`,
        'members.list',
        { collectiveSlug: 'example', tierSlug: 'backers', backerType, format },
      ],
    );
  }
  for (const role of ['attendees', 'organizers', 'all']) {
    v1Cases.push([
      `/example/events/meetup/${role}.${format}`,
      'members.list',
      { collectiveSlug: 'example', eventSlug: 'meetup', role, format },
    ]);
  }
}

const routeCases = v1Cases.flatMap(([url, controller, params]) => [
  [url, controller, params],
  [`/v1${url}`, controller, { version: 'v1', ...params }],
]);

for (const tierSlug of [undefined, 'backers']) {
  for (const filter of tierSlug ? [undefined, 'incoming'] : [undefined, 'incoming', 'outgoing']) {
    for (const status of [undefined, 'active', 'cancelled', 'error', 'paid', 'pending']) {
      const params = {
        slug: 'example',
        ...(tierSlug && { tierSlug }),
        ...(filter && { filter }),
        ...(status && { status }),
      };
      const prefix = tierSlug ? `/v2/example/tier/${tierSlug}/orders` : '/v2/example/orders';
      routeCases.push([[prefix, filter, status].filter(Boolean).join('/'), 'accountOrders', params]);
    }
  }
}

for (const reportType of ['transactions', 'hostTransactions']) {
  for (const type of [undefined, 'credit', 'debit']) {
    for (const kind of [
      undefined,
      'contribution',
      'expense',
      'added_funds',
      'host_fee',
      'host_fee_share',
      'host_fee_share_debt',
      'platform_tip',
      'platform_tip_debt',
    ]) {
      for (const format of ['json', 'csv', 'txt']) {
        const path = [`/v2/example/${reportType}`, type, kind].filter(Boolean).join('/');
        routeCases.push([
          `${path}.${format}`,
          'accountTransactions',
          { slug: 'example', reportType, ...(type && { type }), ...(kind && { kind }), format },
        ]);
      }
    }
  }
}

for (const format of ['json', 'csv']) {
  routeCases.push(
    [`/v2/example/contributors.${format}`, 'accountContributors', { slug: 'example', format }],
    [`/v2/example/hosted-collectives.${format}`, 'hostedCollectives', { slug: 'example', format }],
  );
}

describe('routes', () => {
  const app = express();
  loadRoutes(app);

  describe.each([
    ['original case', false, ''],
    ['trailing slash', false, '/'],
    ['upper case', true, ''],
    ['upper case with trailing slash', true, '/'],
  ])('%s', (_label, upperCase, suffix) => {
    test.each(routeCases)('GET %s', async (url, controller, params) => {
      const response = await inject(app, { url: (upperCase ? url.toUpperCase() : url) + suffix });
      const expectedParams = upperCase
        ? Object.fromEntries(Object.entries(params).map(([key, value]) => [key, value.toUpperCase()]))
        : params;
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ controller, params: expectedParams });
    });
  });

  test.each([
    ['/some.slug.json', 'collectives.info', { collectiveSlug: 'some.slug', format: 'json' }],
    [
      '/v1/example/events/some.event.json',
      'events.info',
      { version: 'v1', collectiveSlug: 'example', eventSlug: 'some.event', format: 'json' },
    ],
    ['/v2/some%2Fslug/orders/active', 'accountOrders', { slug: 'some/slug', status: 'active' }],
    ['/v2/example/tier/backers/orders?filter=outgoing', 'accountOrders', { slug: 'example', tierSlug: 'backers' }],
  ])('preserves params for %s', async (url, controller, params) => {
    const response = await inject(app, { url });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ controller, params });
  });

  test.each([
    '/v2/example.json',
    '/v1/collectives/example/transactions/123',
    '/v1/collectives/example/transactions/2b1b7a7e-4d4f-4c3e-9f1a-6a2b3c4d5e6f',
    '/example.csv',
    '/example.xml',
    '/example/members.xml',
    '/example/members/invalid.json',
    '/example/tiers/backers/invalid.json',
    '/example/events/meetup.csv',
    '/example/events/meetup/invalid.json',
    '/v2/example/orders/invalid',
    '/v2/example/orders/incoming/invalid',
    '/v2/example/orders/active/incoming',
    '/v2/example/orders/incoming/active/extra',
    '/v2/example/tier/backers/orders/outgoing',
    '/v2/example/tier/backers/orders/outgoing/active',
    '/v2/example/invalid.json',
    '/v2/example/transactions/invalid.json',
    '/v2/example/transactions/credit/invalid.json',
    '/v2/example/transactions/expense/credit.json',
    '/v2/example/transactions.xml',
    '/v2/example/contributors.txt',
    '/v2/example/hosted-collectives.txt',
    '/v2/example/orders//',
  ])('rejects GET %s', async (url) => {
    const response = await inject(app, { url });
    expect(response.statusCode).toBe(404);
  });

  test.each([
    ['/v2/example/transactions.json', 'accountTransactions'],
    ['/v2/example/hosted-collectives.csv', 'hostedCollectives'],
  ])('passes POST %s to the controller for method validation', async (url, controller) => {
    const response = await inject(app, { method: 'POST', url });
    expect(response.statusCode).toBe(200);
    expect(response.json().controller).toBe(controller);
  });

  test.each(['/v2/example/invalid.json', '/v2/example/contributors.json', '/v2/example/transactions.xml'])(
    'rejects POST %s',
    async (url) => {
      const response = await inject(app, { method: 'POST', url });
      expect(response.statusCode).toBe(404);
    },
  );

  test('supports HEAD requests', async () => {
    const response = await inject(app, { method: 'HEAD', url: '/v2/example/orders/active' });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('');
  });

  test('rejects malformed percent encoding', async () => {
    const response = await inject(app, { url: '/v2/%FF/orders' });
    expect(response.statusCode).toBe(400);
  });
});

describe('removed follower routes', () => {
  const app = express();
  loadRoutes(app);

  test.each([
    '/veganizerbxl/events/superfilles/followers.json',
    '/veganizerbxl/events/superfilles/followers.csv',
    '/v1/veganizerbxl/events/superfilles/followers.json',
    '/v1/veganizerbxl/events/superfilles/followers.csv',
  ])('returns 404 for %s', async (url) => {
    const response = await inject(app, { method: 'GET', url });
    expect(response.statusCode).toEqual(404);
  });
});
