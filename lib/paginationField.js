import { gql } from 'graphql-tag';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args || {};

      try {
        // Read the number of items on the page from the cache
        const data = cache.readQuery({ query: PAGINATION_QUERY });
        const count = data?._allProductsMeta?.count;

        // If we don't have enough information to calculate pagination,
        // or if first isn't provided, return whatever we have or let it fetch
        if (count === undefined || !first) {
          return existing && existing.length ? existing : undefined;
        }

        const page = (skip || 0) / first + 1;
        const pages = Math.ceil(count / first);

        // Check if we have existing items
        const items = (existing || []).slice(skip, skip + first).filter((x) => x);

        // If there are items, AND there aren't enough items to satisfy how many were requested
        // AND we are on the last page THEN JUST SEND IT
        if (items.length && items.length !== first && page === pages) {
          return items;
        }
        if (items.length !== first) {
          // We don't have any items, we must go to the network to fetch them
          return;
        }

        // If there are items, just return them from the cache
        if (items.length) {
          return items;
        }

        return; // fallback to network
      } catch (e) {
        return existing && existing.length ? existing : undefined;
      }
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args || { skip: 0 };
      // This runs when the Apollo client comes back from the network with our product
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // Finally we return the merged items to the cache
      return merged;
    },
  };
}
