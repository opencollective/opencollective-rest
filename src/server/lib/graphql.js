import { GraphQLClient } from 'graphql-request';

import { getGraphqlUrl } from './utils';

let client;

export function getClient({ apiKey } = {}) {
  if (!client) {
    client = new GraphQLClient(getGraphqlUrl({ apiKey }), { headers: {} });
  }
  return client;
}

export async function fetchCollective(collectiveSlug) {
  const query = `
  query Collective($collectiveSlug: String) {
    Collective(slug:$collectiveSlug) {
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

  const result = await getClient().request(query, { collectiveSlug });
  return result.Collective;
}

export async function fetchEvents(parentCollectiveSlug, options = { limit: 10 }) {
  const query = `
  query allEvents($slug: String!, $limit: Int) {
    allEvents(slug:$slug, limit: $limit) {
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

  const result = await getClient().request(query, {
    slug: parentCollectiveSlug,
    limit: options.limit || 10,
  });
  return result.allEvents;
}

export async function fetchEvent(eventSlug) {
  const query = `
  query Collective($slug: String) {
    Collective(slug:$slug) {
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

  const result = await getClient().request(query, { slug: eventSlug });
  return result.Collective;
}

export const allTransactionsQuery = `
query allTransactions($collectiveSlug: String!, $limit: Int, $offset: Int, $type: String, $includeVirtualCards: Boolean ) {
  allTransactions(collectiveSlug: $collectiveSlug, limit: $limit, offset: $offset, type: $type, includeVirtualCards: $includeVirtualCards) {
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

export const getTransactionQuery = `
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
