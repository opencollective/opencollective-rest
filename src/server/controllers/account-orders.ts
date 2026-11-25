import type { Request, Response } from 'express';
import gql from 'graphql-tag';
import { intersection, pick } from 'lodash';

import type { AccountOrdersQuery as AccountOrdersResult } from '../../graphql/types/v2/graphql';
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
    const result = await graphqlRequest<AccountOrdersResult>(query, variables, { version: 'v2' });
    // Matches the error returned by the API for unknown accounts, handled below
    if (!result.account) {
      throw new Error('No collective found');
    }
    res.send(result.account.orders);
  } catch (err) {
    // Everything thrown by the GraphQL client is an Error
    const { message } = err as Error;
    if (message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(`Error while fetching collective orders: ${message}`);
    res.status(400).send(`Error while fetching collective orders.`);
  }
};

export default accountOrders;
