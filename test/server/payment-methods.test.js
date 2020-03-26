import fetch from 'node-fetch';

const REST_URL = process.env.REST_URL || 'https://rest.opencollective.com';

describe('payment-methods.test.js', () => {
  test('create payment method (missing parameters)', async () => {
    const result = await fetch(`${REST_URL}/v1/payment-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }).then(response => response.json());

    expect(result.error).toEqual('Variable "$CollectiveId" of required type "Int!" was not provided.');
  });

  // TODO: Need to create organization and application/apiKey
  // TODO: Need to create a source PaymentMethod
  const params = {
    CollectiveId: 1863,
    PaymentMethodId: 68318,
    amount: 2500,
    currency: 'USD',
    limitedToTags: ['open source', 'diversity in tech'],
    limitedToHostCollectiveIds: [11004, 9804],
    type: 'virtualcard',
  };

  test('create payment method (no api key / not logged in)', async () => {
    const result = await fetch(`${REST_URL}/v1/payment-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(response => response.json());

    expect(result.error).toEqual('You need to be logged in to create this payment method.');
  });

  test.skip('create payment method (success)', async () => {
    const result = await fetch(`${REST_URL}/v1/payment-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(response => response.json());

    console.log(result);
  });
});
