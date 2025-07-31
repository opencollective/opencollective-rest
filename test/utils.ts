import '../src/env';

import jwt from 'jsonwebtoken';
import { inject } from 'light-my-request';

import app from '../src/server/app';

const cacheBurst = `cacheBurst=${Math.round(Math.random() * 100000)}`;

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export const fetchResponseWithCacheBurst = async (path: string, options: RequestOptions = {}) => {
  const pathWithCacheBurst = [path, cacheBurst].join(path.indexOf('?') === -1 ? '?' : '&');

  const url = new URL(pathWithCacheBurst, 'http://localhost');
  const method = (options.method || 'GET').toUpperCase();
  const headers = options.headers || {};

  return inject(app, {
    method: method as any,
    url: url.pathname + url.search,
    headers,
    payload: options.body,
  });
};

export const fetchJsonWithCacheBurst = async (path: string, options: RequestOptions = {}) => {
  const response = await fetchResponseWithCacheBurst(path, options);
  try {
    return JSON.parse(response.payload);
  } catch {
    return response.payload;
  }
};

/**
 * Default user: 9474 (testuser+admin@opencollective.com)
 */
export const generateJWT = (userId = 9474): string => {
  return jwt.sign(
    {
      scope: 'session',
      sessionId: '1234567890',
    },
    'vieneixaGhahk2aej2pohsh2aeB1oa6o', // Default development secret
    {
      expiresIn: '1h',
      subject: String(userId),
      algorithm: 'HS256',
      header: {
        kid: 'HS256-2019-09-02',
      },
    },
  );
};
