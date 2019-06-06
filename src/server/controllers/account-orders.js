import { pick, intersection } from 'lodash';

import { logger } from '../logger';
import { getClient } from '../lib/graphql';

const query = `query account($slug: String!, $filter: AccountOrdersFilter, $status: [OrderStatus], $limit: Int, $offset: Int) {
  account(slug: $slug) {
    orders(filter: $filter, status: $status, limit: $limit, offset: $offset) {
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
}`;

const accountOrders = async (req, res) => {
  const variables = pick({ ...req.query, ...req.params }, ['slug', 'filter', 'status', 'limit', 'offset']);
  variables.limit = Number(variables.limit) || 100;
  variables.offset = Number(variables.offset) || 0;

  if (variables.status) {
    variables.status = intersection(variables.status.toUpperCase().split(','), [
      'ACTIVE',
      'PAID',
      'ERROR',
      'CANCELLED',
    ]);
  }

  variables.filter = variables.filter.toUpperCase();

  try {
    const result = await getClient({ version: 'v2' }).request(query, variables);
    res.send(result.account.orders);
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(err.message);
    res.status(400).send(`Error while fetching collective orders: ${err.message}`);
  }
};

export default accountOrders;
