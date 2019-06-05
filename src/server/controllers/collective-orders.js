import { pick, pickBy, intersection } from 'lodash';

import { logger } from '../logger';
import { getClient } from '../lib/graphql';

const query = `query collective($slug: String!, $limit: Int, $offset: Int, $status: [OrderStatus]) {
  collective(slug: $slug) {
    orders(status: $status, limit: $limit, offset: $offset) {
      limit
      offset
      totalCount
      nodes {
        fromAccount {
          name
          slug
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

const collectiveOrders = async (req, res) => {
  const variables = pick({ ...req.query, ...req.params }, ['slug', 'status', 'limit', 'offset']);

  variables.limit = Number(variables.limit) || 100;
  variables.offset = Number(variables.offset) || 0;

  if (variables.status) {
    variables.status = intersection(variables.status.split(','), ['ACTIVE', 'PAID', 'ERROR', 'CANCELLED']);
  }

  try {
    const result = await getClient({ version: 'v2' }).request(query, pickBy(variables));
    res.send(result.collective.orders);
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.error(err.message);
    res.status(400).send(`Error while fetching collective orders: ${err.message}`);
  }
};

export default collectiveOrders;
