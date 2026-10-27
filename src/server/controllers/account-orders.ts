import type { Request, Response } from 'express';
import gql from 'graphql-tag';
import { intersection, pick } from 'lodash';

import { graphqlRequest } from '../lib/graphql';
import { logger } from '../logger';

const query = gql`
  query AccountOrders(
    $slug: String!
    $filter: AccountOrdersFilter
    $status: [OrderStatus]
    $tierSlug: String
    $limit: Int
    $offset: Int
  ) {
    account(slug: $slug) {
      orders(filter: $filter, status: $status, tierSlug: $tierSlug, limit: $limit, offset: $offset) {
        limit
        offset
        totalCount
        nodes {
          fromAccount {
            name
            slug
            type
            imageUrl
            website
            twitterHandle
          }
          amount {
            value
          }
          tier {
            slug
          }
          frequency
          status
          totalDonations {
            value
          }
          createdAt
        }
      }
    }
  }
`;

type AccountOrdersParams = Record<string, string> & { slug: string };

type AccountOrdersQuery = Record<string, string> & {
  filter?: string;
  status?: string;
  tierSlug?: string;
  limit?: string;
  offset?: string;
};

type AccountOrdersVariables = {
  slug?: string;
  filter?: string;
  status?: string | string[];
  tierSlug?: string;
  limit?: string | number;
  offset?: string | number;
};

interface AccountOrdersResponse {
  account: { orders: unknown };
}

const accountOrders = async (
  req: Request<AccountOrdersParams, unknown, unknown, AccountOrdersQuery>,
  res: Response,
): Promise<Response | void> => {
  const variables: AccountOrdersVariables = pick({ ...req.params, ...req.query }, [
    'slug',
    'filter',
    'status',
    'tierSlug',
    'limit',
    'offset',
  ]);
  variables.limit = Number(variables.limit) || 100;
  variables.offset = Number(variables.offset) || 0;

  if (variables.status) {
    // The query parameter is a single value before it gets split into the statuses the API accepts
    const status = variables.status as string;
    variables.status = intersection(status.toUpperCase().split(','), [
      'ACTIVE',
      'CANCELLED',
      'ERROR',
      'PAID',
      'PENDING',
    ]);
  } else {
    variables.status = ['ACTIVE', 'CANCELLED', 'PAID'];
  }

  if (variables.tierSlug) {
    variables.filter = 'INCOMING';
  } else if (variables.filter) {
    variables.filter = variables.filter.toUpperCase();
  }

  try {
    const result = await graphqlRequest<AccountOrdersResponse>(query, variables, { version: 'v2' });
    res.send(result.account.orders);
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(`Error while fetching collective orders: ${err.message}`);
    res.status(400).send(`Error while fetching collective orders.`);
  }
};

export default accountOrders;
