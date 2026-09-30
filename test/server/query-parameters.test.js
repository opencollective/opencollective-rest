import { inject } from 'light-my-request';

import app from '../../src/server/app';
import { graphqlRequest, graphqlRequestWithRetry } from '../../src/server/lib/graphql';

jest.mock('../../src/server/lib/graphql', () => ({
  graphqlRequest: jest.fn(),
  graphqlRequestWithRetry: jest.fn(),
}));

describe('query parameters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each(['transactions', 'hostTransactions'])('preserves structured filters for %s', async (reportType) => {
    const transactions = { nodes: [], totalCount: 0, limit: 1000, offset: 0 };
    graphqlRequestWithRetry.mockResolvedValue({ transactions });

    const response = await inject(app, {
      url: `/v2/example/${reportType}.json?manualPaymentProvider[0][id]=provider-one&manualPaymentProvider[1][id]=provider-two`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(transactions);
    expect(graphqlRequestWithRetry).toHaveBeenCalledTimes(1);
    expect(graphqlRequestWithRetry).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ manualPaymentProvider: [{ id: 'provider-one' }, { id: 'provider-two' }] }),
      expect.anything(),
    );
  });

  test('keeps tier orders incoming when the query requests outgoing', async () => {
    graphqlRequest.mockResolvedValue({ account: { orders: { nodes: [] } } });

    const response = await inject(app, { url: '/v2/example/tier/backers/orders?filter=outgoing' });

    expect(response.statusCode).toBe(200);
    expect(graphqlRequest).toHaveBeenCalledTimes(1);
    expect(graphqlRequest).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ tierSlug: 'backers', filter: 'INCOMING' }),
      expect.anything(),
    );
  });
});
