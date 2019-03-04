import { get, pick } from 'lodash';

import { getClient, allTransactionsQuery, getTransactionQuery } from '../lib/graphql';

/**
 * Get array of all transactions of a collective given its slug
 */
export const allTransactions = async (req, res) => {
  try {
    const args = pick(req.query, ['limit', 'offset', 'type', 'includeVirtualCards']);
    args.collectiveSlug = get(req, 'params.collectiveSlug');
    const response = await getClient({ apiKey: req.apiKey }).request(allTransactionsQuery, args);
    const result = get(response, 'allTransactions', []);
    res.send({ result });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.errors) {
      const singleError = error.response.errors[0];
      res.status(400).send({ error: singleError.message });
    } else if (error.response && error.response.error) {
      res.status(400).send({ error: error.response.error.message });
    } else {
      res.status(400).send({ error: error.toString() });
    }
  }
};

/**
 * Get one transaction of a collective given its uuid
 */
export const getTransaction = async (req, res) => {
  try {
    const args = pick(req.params, ['id', 'uuid']);
    const response = await getClient({ apiKey: req.apiKey }).request(getTransactionQuery, args);
    if (response.errors) {
      throw new Error(response.errors[0]);
    }
    const result = get(response, 'Transaction');
    if (req.params.collectiveSlug !== result.collective.slug) {
      res.status(404).send({ error: 'Not a collective transaction.' });
    } else {
      res.send({ result });
    }
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};
