import { getPage, hasNextPage } from '../../src/server/lib/pagination';

describe('pagination', () => {
  describe('getPage', () => {
    it('returns the collection values', () => {
      expect(getPage({ nodes: [{ id: 1 }, { id: 2 }], totalCount: 5, limit: 2, offset: 0 })).toEqual({
        nodes: [{ id: 1 }, { id: 2 }],
        totalCount: 5,
        limit: 2,
        offset: 0,
      });
    });

    it('defaults null or missing fields', () => {
      const empty = { nodes: [], totalCount: 0, limit: 0, offset: 0 };
      expect(getPage({ nodes: null, totalCount: null, limit: null, offset: null })).toEqual(empty);
      expect(getPage({})).toEqual(empty);
    });

    it('drops null nodes', () => {
      expect(getPage({ nodes: [{ id: 1 }, null, { id: 3 }], totalCount: 3, limit: 3, offset: 0 }).nodes).toEqual([
        { id: 1 },
        { id: 3 },
      ]);
    });
  });

  describe('hasNextPage', () => {
    it('is true while there are results after this page', () => {
      expect(hasNextPage({ nodes: [], totalCount: 5, limit: 2, offset: 0 })).toBe(true);
      expect(hasNextPage({ nodes: [], totalCount: 5, limit: 2, offset: 2 })).toBe(true);
    });

    it('is false on the last page', () => {
      expect(hasNextPage({ nodes: [], totalCount: 5, limit: 2, offset: 4 })).toBe(false);
      expect(hasNextPage({ nodes: [], totalCount: 4, limit: 2, offset: 2 })).toBe(false);
      expect(hasNextPage({ nodes: [], totalCount: 0, limit: 2, offset: 0 })).toBe(false);
    });

    it('is false when the limit is 0, as the offset would never advance', () => {
      expect(hasNextPage({ nodes: [], totalCount: 5, limit: 0, offset: 0 })).toBe(false);
    });
  });
});
