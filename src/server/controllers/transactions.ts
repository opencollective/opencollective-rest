import type { Request, Response } from 'express';
import { get, pick } from 'lodash';

import { allTransactionsQuery, graphqlRequest } from '../lib/graphql';

type TransactionsParams = Record<string, string> & { collectiveSlug: string };

type TransactionsQuery = Record<string, string> & { limit?: string; offset?: string; type?: string };

interface AllTransactionsResponse {
  allTransactions: unknown[];
}

// Set by the requireApiKey middleware (see routes.ts)
type TransactionsRequest = Request<TransactionsParams, unknown, unknown, TransactionsQuery> & { apiKey?: string };

/**
 * Get array of all transactions of a collective given its slug
 */
export const allTransactions = async (req: TransactionsRequest, res: Response): Promise<Response | void> => {
  try {
    const args: Record<string, unknown> = pick(req.query, ['limit', 'offset', 'type']);
    args.collectiveSlug = get(req, 'params.collectiveSlug');
    if (args.limit) {
      args.limit = Number(args.limit);
    }
    if (args.offset) {
      args.offset = Number(args.offset);
    }
    const response = await graphqlRequest<AllTransactionsResponse>(allTransactionsQuery, args, {
      apiKey: req.apiKey,
    });
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
