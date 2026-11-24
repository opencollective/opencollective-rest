import http from 'http';
import https from 'https';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import gqlV1 from 'graphql-tag';
import type { Response as NodeFetchResponse } from 'node-fetch';
import nodeFetch from 'node-fetch';
import omitDeep from 'omit-deep-lodash';

import { getGraphqlUrl, parseToBooleanDefaultTrue } from './utils';

interface FetchInit {
  agent?: http.Agent | ((parsedURL: URL) => http.Agent);
  headers?: Record<string, string>;
  body?: string;
}

export interface ClientParameters {
  version?: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

let customAgent: ((parsedURL: URL) => http.Agent | https.Agent) | undefined;

// node-fetch implements the fetch API at runtime; Apollo's HttpLink is typed against the DOM one
const asFetchResponse = (response: NodeFetchResponse | Response): Response => response as Response;

async function fetch(url: string, options: FetchInit = {}): Promise<Response> {
  options.agent = getCustomAgent();

  // Add headers to help the API identify origin of requests
  options.headers = options.headers || {};
  options.headers['oc-env'] = String(process.env.OC_ENV);
  options.headers['oc-secret'] = String(process.env.OC_SECRET);
  options.headers['oc-application'] = String(process.env.OC_APPLICATION);
  options.headers['user-agent'] = 'opencollective-rest/1.0 node-fetch/1.0';

  const result = await nodeFetch(url, options);

  return asFetchResponse(result);
}

function getCustomAgent(): ((parsedURL: URL) => http.Agent | https.Agent) | undefined {
  if (!customAgent) {
    const { FETCH_AGENT_KEEP_ALIVE, FETCH_AGENT_KEEP_ALIVE_MSECS } = process.env;
    const keepAlive = FETCH_AGENT_KEEP_ALIVE !== undefined ? parseToBooleanDefaultTrue(FETCH_AGENT_KEEP_ALIVE) : true;
    const keepAliveMsecs = FETCH_AGENT_KEEP_ALIVE_MSECS ? Number(FETCH_AGENT_KEEP_ALIVE_MSECS) : 10000;
    const httpAgent = new http.Agent({ keepAlive, keepAliveMsecs });
    const httpsAgent = new https.Agent({ keepAlive, keepAliveMsecs });
    customAgent = (_parsedURL) => (_parsedURL.protocol === 'http:' ? httpAgent : httpsAgent);
  }
  return customAgent;
}

function getClient({ version = 'v1', apiKey }: ClientParameters = {}): ApolloClient {
  return new ApolloClient({
    // Apollo only ever calls this with a string URL and a plain options object (see FetchInit), but its `fetch` option
    // is typed against the DOM signature, which also accepts URL and Request inputs.
    link: new HttpLink({ uri: getGraphqlUrl({ version, apiKey }), fetch: fetch as typeof globalThis.fetch }),
    cache: new InMemoryCache({
      possibleTypes: {
        Transaction: ['Expense', 'Order', 'Debit', 'Credit'],
        CollectiveInterface: ['Collective', 'Event', 'Project', 'Fund', 'Organization', 'User', 'Vendor'],
        Account: ['Collective', 'Host', 'Individual', 'Fund', 'Project', 'Bot', 'Event', 'Organization', 'Vendor'],
        AccountWithHost: ['Collective', 'Event', 'Fund', 'Project'],
        AccountWithParent: ['Event', 'Project'],
        AccountWithContributions: ['Collective', 'Organization', 'Event', 'Fund', 'Project', 'Host'],
      },
    }),
  });
}

export function graphqlRequest<TData = unknown>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
  clientParameters?: ClientParameters,
): Promise<TData> {
  return getClient(clientParameters)
    .query({
      query,
      variables,
      // Each request has its own client, so the cache would never be read: skip writing to it
      fetchPolicy: 'no-cache',
      context: {
        headers: clientParameters?.headers,
      },
    })
    .then((result) => omitDeep(result.data, ['__typename']) as TData);
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export async function graphqlRequestWithRetry<TData = unknown>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
  clientParameters?: ClientParameters,
  { maxAttempts = 5, baseDelayMs = 1000 }: { maxAttempts?: number; baseDelayMs?: number } = {},
): Promise<TData> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await graphqlRequest<TData>(query, variables, clientParameters);
    } catch (err) {
      if (attempt >= maxAttempts) {
        throw err;
      }
      const delay = baseDelayMs * Math.pow(2, attempt);
      console.warn(`graphqlRequestWithRetry: attempt ${attempt}/${maxAttempts} failed, retrying in ${delay}ms`);
      await sleep(delay);
    }
  }
}

export const allTransactionsQuery = gqlV1 /* GraphQL */ `
  query AllTransactions($collectiveSlug: String!, $limit: Int, $offset: Int, $type: String) {
    allTransactions(collectiveSlug: $collectiveSlug, limit: $limit, offset: $offset, type: $type) {
      id
      uuid
      type
      amount
      currency
      hostCurrency
      hostCurrencyFxRate
      hostFeeInHostCurrency
      platformFeeInHostCurrency
      paymentProcessorFeeInHostCurrency
      netAmountInCollectiveCurrency
      createdAt
      host {
        id
        slug
      }
      createdByUser {
        id
        email
      }
      fromCollective {
        id
        slug
        name
        image
      }
      collective {
        id
        slug
        name
        image
      }
      paymentMethod {
        id
        service
        name
      }
    }
  }
`;
