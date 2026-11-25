import gql from 'graphql-tag';
import { compact } from 'lodash';

import type { CollectiveQuery, EventQuery } from '../../graphql/types/v2/graphql';

import { graphqlRequest } from './graphql';
import type { MergeUnion } from './types';

interface CollectiveStats {
  balance: number | null;
  backers: { all: number | null };
  yearlyBudget: number | null;
}

export interface Collective {
  id: number;
  slug: string;
  image: string | null;
  currency: string;
  stats: CollectiveStats;
}

export interface Event {
  id: number;
  name: string | null;
  description: string | null;
  longDescription: string | null;
  slug: string;
  image: string | null;
  startsAt: string | null;
  endsAt: string | null;
  timezone: string | null;
  location: { name: string | null; address: string | null; lat: number | null; long: number | null } | null;
  currency: string;
  tiers: Array<{ id: number; name: string | null; description: string | null; amount: number | null }>;
  // Added by the events controller on top of the GraphQL response
  url?: string;
  attendees?: string;
}

type CollectiveV2 = NonNullable<CollectiveQuery['account']>;

// Maps the v2 response to the shape the v1 query used to return
export function mapCollectiveV2(account: CollectiveV2): Collective {
  return {
    id: account.legacyId,
    slug: account.slug,
    image: account.imageUrl,
    currency: account.currency,
    stats: {
      balance: account.stats?.balance.valueInCents ?? null,
      backers: { all: account.stats?.contributorsCount ?? null },
      yearlyBudget: account.stats?.yearlyBudget.valueInCents ?? null,
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

  const result = await graphqlRequest<CollectiveQuery>(query, { collectiveSlug }, { version: 'v2' });
  // Same error as the API's for unknown accounts, turned into a 404 by the controllers
  if (!result.account) {
    throw new Error('Account Not Found');
  }
  return mapCollectiveV2(result.account);
}

// The accounts are a union of types: the dates only exist on events, and the tiers on accounts with contributions
type EventV2 = MergeUnion<NonNullable<EventQuery['account']>>;

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
    tiers: compact(event.tiers?.nodes).map((tier) => ({
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

  const result = await graphqlRequest<EventQuery>(query, { slug: eventSlug }, { version: 'v2' });
  // Same error as the API's for unknown accounts, turned into a 404 by the controllers
  if (!result.account) {
    throw new Error('Account Not Found');
  }
  return mapEventV2(result.account);
}
