import type { Request, Response } from 'express';
import { get, toUpper, trim } from 'lodash';

export const getBaseApiUrl = () => {
  return process.env.API_URL;
};

export const getGraphqlUrl = ({ apiKey, version }: { apiKey?: string; version?: string } = {}) => {
  if (apiKey) {
    return `${getBaseApiUrl()}/graphql/${version || 'v1'}?apiKey=${apiKey}`;
  } else {
    return `${getBaseApiUrl()}/graphql/${version || 'v1'}?api_key=${process.env.API_KEY}`;
  }
};

/**
 * Gives the number of days between two dates
 */
export const days = (d1, d2 = new Date()) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((new Date(d1).getTime() - new Date(d2).getTime()) / oneDay));
};

export function json2csv(json) {
  const lines = [`"${Object.keys(json[0]).join('","')}"`];
  json.forEach((row) => {
    lines.push(
      `"${Object.values(row)
        .map((td) => {
          if (typeof td === 'string') {
            return td.replace(/"/g, '""').replace(/\n/g, '  ');
          } else if (td !== undefined && td !== null) {
            return td;
          } else {
            return '';
          }
        })
        .join('","')}"`,
    );
  });
  return lines.join('\n');
}

export const parseToBooleanDefaultFalse = (value: null | undefined | string | boolean) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }
  const string = value.toString().trim().toLowerCase();
  return ['on', 'enabled', '1', 'true', 'yes', 1].includes(string);
};

export const parseToBooleanDefaultTrue = (value: null | undefined | string | boolean) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  const string = value.toString().trim().toLowerCase();
  return !['off', 'disabled', '0', 'false', 'no', 0].includes(string);
};

export const splitIds = (str?: string) => str?.split(',').map(trim) || [];

export const splitEnums = (str?: string) => splitIds(str).map(toUpper);

export const applyMapping = (mapping, row, meta?) => {
  const res = {};
  Object.keys(mapping).map((key) => {
    const val = mapping[key];
    if (typeof val === 'function') {
      return (res[key] = val(row, meta));
    } else {
      return (res[key] = get(row, val));
    }
  });
  return res;
};

export const isAuthenticatedRequest = (req: Request) => {
  return Boolean(
    req.cookies?.authorization ||
    req.get('Authorization') ||
    req.get('Api-Key') ||
    req.get('Personal-Token') ||
    req.query.apiKey ||
    req.query.personalToken,
  );
};

/** Prevent CDN/browser caching of authenticated export responses (defence in depth). */
export const setPrivateCacheHeadersIfAuthenticated = (req: Request, res: Response) => {
  if (isAuthenticatedRequest(req)) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
};
