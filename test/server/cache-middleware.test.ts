import { inject } from 'light-my-request';

import app from '../../src/server/app';
import { generateJWT } from '../utils';

describe('cache middleware', () => {
  test('is public if not authenticated', async () => {
    const response = await inject(app, { method: 'GET', url: '/' });
    expect(response.headers['cache-control']).toEqual('public, max-age=60');
    expect(response.headers['vary']).toContain('Cookie');
  });

  test('is not cacheable if authenticated with Authorization header', async () => {
    const response = await inject(app, {
      method: 'GET',
      url: '/',
      headers: { authorization: `Bearer ${generateJWT()}` },
    });
    expect(response.headers['cache-control']).toEqual('no-cache');
    expect(response.headers['pragma']).toEqual('no-cache');
    expect(response.headers['expires']).toEqual('0');
  });

  test('is not cacheable if authenticated with authorization cookie', async () => {
    const response = await inject(app, {
      method: 'GET',
      url: '/',
      headers: { cookie: `authorization="Bearer ${generateJWT()}"` },
    });
    expect(response.headers['cache-control']).toEqual('no-cache');
    expect(response.headers['pragma']).toEqual('no-cache');
    expect(response.headers['expires']).toEqual('0');
  });
});
