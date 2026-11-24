import gql from 'graphql-tag';

import { graphqlRequest } from './graphql';

interface CollectiveStats {
  balance: number;
  backers: { all: number };
  yearlyBudget: number;
}

export interface Collective {
  id: number;
  slug: string;
  image: string;
  currency: string;
  stats: CollectiveStats;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  slug: string;
  image: string;
  startsAt: string | null;
  endsAt: string | null;
  timezone: string | null;
  location: { name: string; address: string; lat: number; long: number } | null;
  currency: string;
  tiers: Array<{ id: number; name: string; description: string; amount: number }>;
  // Added by the events controller on top of the GraphQL response
  url?: string;
  attendees?: string;
}

interface CollectiveV2 {
  legacyId: number;
  slug: string;
  imageUrl: string;
  currency: string;
  stats: {
    balance: { valueInCents: number };
    yearlyBudget: { valueInCents: number };
    contributorsCount: number;
  };
}

// Maps the v2 response to the shape the v1 query used to return
export function mapCollectiveV2(account: CollectiveV2): Collective {
  return {
    id: account.legacyId,
    slug: account.slug,
    image: account.imageUrl,
    currency: account.currency,
    stats: {
      balance: account.stats.balance.valueInCents,
      backers: { all: account.stats.contributorsCount },
      yearlyBudget: account.stats.yearlyBudget.valueInCents,
    },
  };
}

export async function fetchCollective(collectiveSlug: string): Promise<Collective> {
  const query = gql`
    query Collective($collectiveSlug: String) {
      account(slug: $collectiveSlug) {
        legacyId
        slug
        imageUrl
        currency
        stats {
          balance {
            valueInCents
          }
          yearlyBudget {
            valueInCents
          }
          contributorsCount
        }
      }
    }
  `;

  const result = await graphqlRequest<{ account: CollectiveV2 }>(query, { collectiveSlug }, { version: 'v2' });
  return mapCollectiveV2(result.account);
}

interface EventV2 {
  legacyId: number;
  name: string;
  description: string;
  longDescription: string;
  slug: string;
  imageUrl: string;
  // Only on events, and tiers only on accounts with contributions: the events route also serves other account types
  startsAt?: string | null;
  endsAt?: string | null;
  timezone?: string | null;
  location: { name: string; address: string; lat: number; long: number } | null;
  currency: string;
  tiers?: { nodes: Array<{ legacyId: number; name: string; description: string; amount: { valueInCents: number } }> };
  parent?: { imageUrl: string | null } | null;
}

// v2 `imageUrl` is `<images>/<slug>/<hash>/logo.png` for an uploaded image, `<images>/<slug>/logo.png` (default) otherwise
function hasUploadedImage(imageUrl?: string | null): boolean {
  if (!imageUrl) {
    return false;
  }
  try {
    return new URL(imageUrl).pathname.split('/').filter(Boolean).length > 2;
  } catch {
    return true;
  }
}

// v1 DateString serialized dates as `Date#toString()` on a UTC server: keep that format
export function formatV1Date(date?: string | null): string | null {
  if (!date || isNaN(new Date(date).getTime())) {
    return null;
  }
  const [weekday, day, month, year, time] = new Date(date).toUTCString().replace(',', '').split(' ');
  return `${weekday} ${month} ${day} ${year} ${time} GMT+0000 (Coordinated Universal Time)`;
}

// Maps the v2 response to the shape the v1 query used to return
export function mapEventV2(event: EventV2): Event {
  return {
    id: event.legacyId,
    name: event.name,
    description: event.description,
    longDescription: event.longDescription,
    slug: event.slug,
    // As in v1, an event without its own image shows its parent's
    image: !hasUploadedImage(event.imageUrl) && event.parent?.imageUrl ? event.parent.imageUrl : event.imageUrl,
    startsAt: formatV1Date(event.startsAt),
    endsAt: formatV1Date(event.endsAt),
    timezone: event.timezone ?? null,
    location: event.location
      ? {
          name: event.location.name,
          address: event.location.address,
          lat: event.location.lat,
          long: event.location.long,
        }
      : event.location,
    currency: event.currency,
    tiers: (event.tiers?.nodes ?? []).map((tier) => ({
      id: tier.legacyId,
      name: tier.name,
      description: tier.description,
      amount: tier.amount.valueInCents,
    })),
  };
}

/**
 * Fetches an event by its slug.
 * /!\ Do not include any private fields, as the result is cached at the CDN level.
 * @param eventSlug - The slug of the event to fetch.
 * @returns The event data.
 */
export async function fetchEvent(eventSlug: string): Promise<Event> {
  const query = gql`
    query Event($slug: String) {
      account(slug: $slug) {
        legacyId
        name
        description
        longDescription
        slug
        imageUrl
        location {
          name
          address
          lat
          long
        }
        currency
        ... on Event {
          startsAt
          endsAt
          timezone
          parent {
            imageUrl
          }
        }
        # v1 returned every tier: v2 defaults to 100 per page, 1,000 at most
        ... on AccountWithContributions {
          tiers(limit: 1000) {
            nodes {
              legacyId
              name
              description
              amount {
                valueInCents
              }
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest<{ account: EventV2 }>(query, { slug: eventSlug }, { version: 'v2' });
  return mapEventV2(result.account);
}
