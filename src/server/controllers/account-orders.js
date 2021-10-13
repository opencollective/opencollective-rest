import gqlV2 from 'graphql-tag';
import { get, intersection, pick } from 'lodash';
import moment from 'moment';

import { applyMapping, json2csv } from '../lib/csv';
import { graphqlRequest } from '../lib/graphql';
import { logger } from '../logger';

const csvMapping = {
  createdAt: (t) => moment.utc(t.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
  updatedAt: (t) => moment.utc(t.updatedAt).format('YYYY-MM-DDTHH:mm:ss'),
  legacyId: 'legacyId',
  shortId: (t) => t.id.substr(0, 8),
  status: 'status',
  frequency: 'frequency',
  amount: (t) => get(t, 'amount.value', 0),
  currency: (t) => get(t, 'amount.currency', 0),
  fromAccountSlug: (t) => get(t, 'fromAccount.slug'),
  fromAccountType: (t) => get(t, 'fromAccount.type'),
};

const query = gqlV2/* GraphQL */ `
  query account(
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
          id
          legacyId
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
            currency
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
          updatedAt
        }
      }
    }
  }
`;

const accountOrders = async (req, res) => {
  const variables = pick({ ...req.params, ...req.query }, ['slug', 'filter', 'status', 'tierSlug', 'limit', 'offset']);
  variables.limit = Number(variables.limit) || 100;
  variables.offset = Number(variables.offset) || 0;

  if (variables.status) {
    variables.status = intersection(variables.status.toUpperCase().split(','), [
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
    const result = await graphqlRequest(query, variables, { version: 'v2' });

    switch (req.params.format) {
      case 'txt':
      case 'csv': {
        if (req.params.format === 'csv') {
          res.setHeader('content-type', 'text/csv;charset=utf-8');
        } else {
          res.setHeader('content-type', 'text/plain;charset=utf-8');
        }

        if (result.account.orders === 0) {
          res.status(404).send('No order found.');
          break;
        }

        const mappedOrders = result.account.orders.nodes.map((t) => applyMapping(csvMapping, t));

        res.send(json2csv(mappedOrders));
        break;
      }
      default:
        res.send(result.account.orders);
    }
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(`Error while fetching collective orders: ${err.message}`);
    res.status(400).send(`Error while fetching collective orders.`);
  }
};

export default accountOrders;
