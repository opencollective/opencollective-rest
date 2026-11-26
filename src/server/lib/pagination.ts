type Collection<TNode> = {
  nodes?: Array<TNode | null> | null;
  totalCount?: number | null;
  limit?: number | null;
  offset?: number | null;
};

export type Page<TNode> = {
  nodes: TNode[];
  totalCount: number;
  limit: number;
  offset: number;
};

/**
 * The GraphQL schema marks the collection fields as nullable, but the API always returns them for the queries
 * used in this service. This normalizes them so the pagination logic doesn't have to deal with `null`.
 */
export const getPage = <TNode>(collection: Collection<TNode>): Page<TNode> => ({
  nodes: (collection.nodes ?? []).filter((node): node is TNode => node !== null),
  totalCount: collection.totalCount ?? 0,
  limit: collection.limit ?? 0,
  offset: collection.offset ?? 0,
});

/**
 * Whether there are more results than what was returned in this page.
 * A page without a positive `limit` never advances, so it's treated as having no next page to avoid looping forever.
 */
export const hasNextPage = (page: Page<unknown>): boolean =>
  page.limit > 0 && page.totalCount > page.limit + page.offset;
