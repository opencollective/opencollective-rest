import fetch from 'node-fetch';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

const getGraphqlUrl = ({ apiKey, version } = {}) => {
  if (apiKey) {
    return `${process.env.API_URL}/graphql/${version || 'v1'}?apiKey=${apiKey}`;
  } else {
    return `${process.env.API_URL}/graphql/${version || 'v1'}?api_key=${process.env.API_KEY}`;
  }
};

export function getClient({ apiKey, version } = {}) {
  version = version || 'v1';
  return new ApolloClient({ fetch, uri: getGraphqlUrl({ apiKey, version }) });
}

export async function fetchCollective(collectiveSlug) {
  const query = gql`
    query Collective($collectiveSlug: String) {
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

  const result = await getClient().query({ query, variables: { collectiveSlug } });
  return result.data.Collective;
}

export async function fetchEvents(parentCollectiveSlug, options = { limit: 10 }) {
  const query = gql`
    query allEvents($slug: String!, $limit: Int) {
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

  const result = await getClient().query({
    query,
    variables: {
      slug: parentCollectiveSlug,
      limit: options.limit || 10,
    },
  });
  return result.data.allEvents;
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

  const result = await getClient().query({ query, variables: { slug: eventSlug } });
  return result.data.Collective;
}

export const allTransactionsQuery = gql`
  query allTransactions(
    $collectiveSlug: String!
    $limit: Int
    $offset: Int
    $type: String
    $includeVirtualCards: Boolean
  ) {
    allTransactions(
      collectiveSlug: $collectiveSlug
      limit: $limit
      offset: $offset
      type: $type
      includeVirtualCards: $includeVirtualCards
    ) {
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

export const createPaymentMethodQuery = gql`
  mutation createPaymentMethod(
    $amount: Int
    $monthlyLimitPerMember: Int
    $CollectiveId: Int!
    $PaymentMethodId: Int
    $description: String
    $expiryDate: String
    $type: String!
    $currency: String!
    $limitedToTags: [String]
    $limitedToCollectiveIds: [Int]
    $limitedToHostCollectiveIds: [Int]
  ) {
    createPaymentMethod(
      amount: $amount
      monthlyLimitPerMember: $monthlyLimitPerMember
      CollectiveId: $CollectiveId
      PaymentMethodId: $PaymentMethodId
      description: $description
      expiryDate: $expiryDate
      type: $type
      currency: $currency
      limitedToTags: $limitedToTags
      limitedToCollectiveIds: $limitedToCollectiveIds
      limitedToHostCollectiveIds: $limitedToHostCollectiveIds
    ) {
      id
      name
      uuid
      collective {
        id
      }
      SourcePaymentMethodId
      initialBalance
      monthlyLimitPerMember
      expiryDate
      currency
      limitedToTags
      limitedToCollectiveIds
      limitedToHostCollectiveIds
    }
  }
`;
