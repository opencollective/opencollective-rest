import http from 'http';
import https from 'https';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import nodeFetch from 'node-fetch';
import omitDeep from 'omit-deep-lodash';

import { getGraphqlUrl, parseToBooleanDefaultTrue } from './utils';

let customAgent;

async function fetch(url, options = {}) {
  options.agent = getCustomAgent();

  // Add headers to help the API identify origin of requests
  options.headers = options.headers || {};
  options.headers['oc-env'] = process.env.OC_ENV;
  options.headers['oc-secret'] = process.env.OC_SECRET;
  options.headers['oc-application'] = process.env.OC_APPLICATION;
  options.headers['user-agent'] = 'opencollective-rest/1.0 node-fetch/1.0';

  const result = await nodeFetch(url, options);

  return result;
}

function getCustomAgent() {
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

function getClient({ version = 'v1', apiKey } = {}) {
  return new ApolloClient({
    link: new HttpLink({ uri: getGraphqlUrl({ version, apiKey }), fetch }),
    cache: new InMemoryCache(),
  });
}

export function graphqlRequest(query, variables, clientParameters) {
  return getClient(clientParameters)
    .query({
      query,
      variables,
      context: {
        headers: clientParameters?.headers,
      },
    })
    .then((result) => omitDeep(result.data, ['__typename']));
}

export function simpleGraphqlRequest(query, variables, { version = 'v1', apiKey, headers = {} } = {}) {
  headers['oc-env'] = process.env.OC_ENV;
  headers['oc-secret'] = process.env.OC_SECRET;
  headers['oc-application'] = process.env.OC_APPLICATION;
  headers['user-agent'] = 'opencollective-rest/1.0';
  const client = new GraphQLClient(getGraphqlUrl({ apiKey, version }), { headers });
  return client.request(query, variables);
}

export async function fetchCollective(collectiveSlug) {
  const query = gql`
    query fetchCollective($collectiveSlug: String) {
      Collective(slug: $collectiveSlug) {
        id
        slug
        image
        currency
        data
        stats {
          balance
          backers {
            all
          }
          yearlyBudget
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { collectiveSlug });
  return result.Collective;
}

export async function fetchEvents(parentCollectiveSlug, options = { limit: 10 }) {
  const query = gql`
    query fetchEvents($slug: String!, $limit: Int) {
      allEvents(slug: $slug, limit: $limit) {
        id
        name
        description
        slug
        image
        startsAt
        endsAt
        timezone
        location {
          name
          address
          lat
          long
        }
      }
    }
  `;

  const result = await graphqlRequest(query, {
    slug: parentCollectiveSlug,
    limit: options.limit || 10,
  });
  return result.allEvents;
}

export async function fetchEvent(eventSlug) {
  const query = gql`
    query Collective($slug: String) {
      Collective(slug: $slug) {
        id
        name
        description
        longDescription
        slug
        image
        startsAt
        endsAt
        timezone
        location {
          name
          address
          lat
          long
        }
        currency
        tiers {
          id
          name
          description
          amount
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { slug: eventSlug });
  return result.Collective;
}

export const allTransactionsQuery = gql`
  query allTransactions($collectiveSlug: String!, $limit: Int, $offset: Int, $type: String) {
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

export const getTransactionQuery = gql`
  query Transaction($id: Int, $uuid: String) {
    Transaction(id: $id, uuid: $uuid) {
      id
      uuid
      type
      createdAt
      description
      amount
      currency
      hostCurrency
      hostCurrencyFxRate
      netAmountInCollectiveCurrency
      hostFeeInHostCurrency
      platformFeeInHostCurrency
      paymentProcessorFeeInHostCurrency
      paymentMethod {
        id
        service
        name
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
      host {
        id
        slug
        name
        image
      }
      ... on Order {
        order {
          id
          status
          subscription {
            id
            interval
          }
        }
      }
    }
  }
`;
