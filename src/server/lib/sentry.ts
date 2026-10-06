import crypto from 'crypto';
import querystring from 'querystring';

import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { cloneDeep, compact } from 'lodash';

import { logger } from '../logger';

const TRACES_SAMPLE_RATE = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0;
const PROFILES_SAMPLE_RATE = parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE) || 0;

export const checkIfSentryConfigured = () => Boolean(process.env.SENTRY_DSN);

export enum HandlerType {
  EXPRESS = 'EXPRESS',
  FALLBACK = 'FALLBACK',
}

export type CaptureErrorParams = {
  severity?: Sentry.SeverityLevel;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  handler?: HandlerType | `${HandlerType}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req?: any;
};

const SENSITIVE_KEY_PATTERN =
  /authorization|api[-_]?key|personal[-_]?token|cookie|set-cookie|token|secret|password|(?:^|[-_])key$/i;

export const isValidDebugSentryKey = (provided: unknown): boolean => {
  const expected = process.env.DEBUG_SENTRY_KEY;
  if (!expected || typeof provided !== 'string' || !provided) {
    return false;
  }
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(providedBuffer, expectedBuffer);
};

const redactValue = () => '[Filtered]';

const redactObject = (value: unknown, depth = 0): unknown => {
  if (depth > 5 || value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => redactObject(item, depth + 1));
  }
  if (typeof value === 'object') {
    const result: Record<string, unknown> = { ...(value as Record<string, unknown>) };
    for (const key of Object.keys(result)) {
      if (SENSITIVE_KEY_PATTERN.test(key)) {
        result[key] = redactValue();
      } else {
        result[key] = redactObject(result[key], depth + 1);
      }
    }
    return result;
  }
  return value;
};

export const redactSensitiveDataFromRequest = (rawRequest) => {
  if (!rawRequest) {
    return rawRequest;
  }

  const request = cloneDeep(rawRequest);

  try {
    if (typeof request.data === 'string' && request.data) {
      request.data = JSON.stringify(redactObject(JSON.parse(request.data)));
    } else if (request.data && typeof request.data === 'object') {
      request.data = redactObject(request.data);
    }
  } catch {
    // request data is not JSON, leave as is
  }

  if (request.headers) {
    const headers: Record<string, unknown> = {};
    for (const key of Object.keys(request.headers)) {
      headers[key] = SENSITIVE_KEY_PATTERN.test(key) ? redactValue() : request.headers[key];
    }
    request.headers = headers;
  }

  if (request.cookies) {
    request.cookies = redactObject(request.cookies);
  }

  if (request['query_string']) {
    const parsed =
      typeof request['query_string'] === 'string'
        ? querystring.parse(request['query_string'])
        : request['query_string'];
    request['query_string'] = redactObject(parsed);
  }

  return request;
};

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.OC_ENV || process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
  release: process.env.HEROKU_SLUG_COMMIT,
  dist: process.env.OC_ENV || process.env.NODE_ENV,
  enabled: checkIfSentryConfigured() && process.env.NODE_ENV !== 'test',
  attachStacktrace: true,
  integrations: compact([
    PROFILES_SAMPLE_RATE > 0 && nodeProfilingIntegration(),
    Sentry.expressIntegration({
      shouldHandleError(error) {
        const status = Number(error?.['status'] ?? error?.['statusCode'] ?? 500);
        return Number.isInteger(status) ? status >= 500 : true;
      },
    }),
  ]),
  beforeSend(event) {
    event.request = redactSensitiveDataFromRequest(event.request);
    return event;
  },
  beforeSendTransaction(event) {
    event.request = redactSensitiveDataFromRequest(event.request);
    return event;
  },
  tracesSampler: (samplingContext) => {
    if (!TRACES_SAMPLE_RATE || !samplingContext) {
      return 0;
    } else if (samplingContext.normalizedRequest?.headers?.['x-sentry-force-sample']) {
      return 1;
    } else {
      return samplingContext.inheritOrSampleWith(TRACES_SAMPLE_RATE);
    }
  },
  // Relative to tracesSampler
  profileSessionSampleRate: PROFILES_SAMPLE_RATE,
});

if (checkIfSentryConfigured() && process.env.NODE_ENV !== 'test') {
  // Global fallback for errors that never reach Express (e.g. rejected promises in async handlers)
  process.on('unhandledRejection', (reason: unknown) => {
    reportErrorToSentry(reason instanceof Error ? reason : new Error(String(reason)), {
      severity: 'fatal',
      handler: HandlerType.FALLBACK,
    });
  });
  process.on('uncaughtException', (err: Error) => {
    reportErrorToSentry(err, { severity: 'fatal', handler: HandlerType.FALLBACK });
  });
}

export function reportErrorToSentry(err: Error, params: CaptureErrorParams = {}): void {
  if (checkIfSentryConfigured() && process.env.NODE_ENV !== 'test') {
    Sentry.withScope((scope) => {
      scope.setLevel(params.severity || 'error');
      if (params.handler) {
        scope.setTag('handler', params.handler);
      }
      if (params.tags) {
        for (const [key, value] of Object.entries(params.tags)) {
          scope.setTag(key, value);
        }
      }
      if (params.extra) {
        for (const [key, value] of Object.entries(params.extra)) {
          scope.setExtra(key, value);
        }
      }
      if (params.req) {
        scope.setSDKProcessingMetadata({ request: params.req });
      }
      Sentry.captureException(err);
    });
  } else if (process.env.NODE_ENV !== 'test') {
    logger.error(err.stack || err.message);
  }
}

export function reportMessageToSentry(message: string, params: CaptureErrorParams = {}): void {
  if (checkIfSentryConfigured() && process.env.NODE_ENV !== 'test') {
    Sentry.withScope((scope) => {
      scope.setLevel(params.severity || 'error');
      if (params.handler) {
        scope.setTag('handler', params.handler);
      }
      Sentry.captureMessage(message);
    });
  } else if (process.env.NODE_ENV !== 'test') {
    logger.error(`[Sentry fallback] ${message}`);
  }
}

export { Sentry };
export default Sentry;
