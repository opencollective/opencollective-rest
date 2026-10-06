import { inject } from 'light-my-request';

import app from '../../src/server/app';
import {
  checkIfSentryConfigured,
  redactSensitiveDataFromRequest,
  reportErrorToSentry,
} from '../../src/server/lib/sentry';

describe('sentry global error handling', () => {
  test('unknown routes return JSON 404', async () => {
    const response = await inject(app, { method: 'GET', url: '/no-such-route-xyz' });
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.payload)).toEqual({ error: { message: 'Not found' } });
  });

  test('debug endpoint requires the configured key', async () => {
    const previousKey = process.env.DEBUG_SENTRY_KEY;
    process.env.DEBUG_SENTRY_KEY = 'test-debug-key';
    try {
      const invalidResponse = await inject(app, { method: 'GET', url: '/debug-sentry?key=wrong-key' });
      expect(invalidResponse.statusCode).toBe(404);

      const validResponse = await inject(app, { method: 'GET', url: '/debug-sentry?key=test-debug-key' });
      expect(validResponse.statusCode).toBe(500);
      expect(JSON.parse(validResponse.payload)).toEqual({ error: { message: 'Internal server error' } });
    } finally {
      if (previousKey === undefined) {
        delete process.env.DEBUG_SENTRY_KEY;
      } else {
        process.env.DEBUG_SENTRY_KEY = previousKey;
      }
    }
  });

  test('sentry is disabled without a DSN', () => {
    expect(checkIfSentryConfigured()).toBe(false);
  });

  test('reportErrorToSentry falls back to logging without a DSN', () => {
    expect(() => reportErrorToSentry(new Error('boom'), { handler: 'EXPRESS' })).not.toThrow();
  });

  test('sensitive data is redacted from Sentry requests', () => {
    const redacted = redactSensitiveDataFromRequest({
      headers: {
        Authorization: 'Bearer secret',
        'Api-Key': 'secret',
        'oc-secret': 'secret',
        'content-type': 'application/json',
      },
      cookies: { authorization: 'Bearer secret' },
      query_string: 'apiKey=secret&key=secret&slug=test',
      data: JSON.stringify({ personalToken: 'secret', slug: 'test' }),
    });
    expect(redacted.headers.Authorization).toBe('[Filtered]');
    expect(redacted.headers['Api-Key']).toBe('[Filtered]');
    expect(redacted.headers['content-type']).toBe('application/json');
    expect(redacted.query_string.apiKey).toBe('[Filtered]');
    expect(redacted.query_string.key).toBe('[Filtered]');
    expect(redacted.query_string.slug).toBe('test');
    expect(JSON.parse(redacted.data).personalToken).toBe('[Filtered]');
    expect(JSON.parse(redacted.data).slug).toBe('test');
  });
});
