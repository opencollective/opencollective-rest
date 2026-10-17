import type { NextFunction, Request, Response } from 'express';
import gqlV1 from 'graphql-tag';
import { get } from 'lodash';
import moment from 'moment';

import { graphqlRequest } from '../lib/graphql';
import { json2csv } from '../lib/utils';
import { logger } from '../logger';

type MembersParams = Record<string, string> & {
  collectiveSlug: string;
  eventSlug?: string;
  role?: string;
  tierSlug?: string;
  backerType?: string;
  format?: string;
};

type MembersQuery = Record<string, string> & {
  apiKey?: string;
  personalToken?: string;
  TierId?: string;
  limit?: string;
  offset?: string;
};

interface MemberRow {
  id: number;
  createdAt: string;
  role: string;
  stats: { totalDonations: number };
  transactions: Array<{ createdAt: string; amount: number; currency: string }>;
  isActive: boolean;
  member: {
    type: string;
    slug: string;
    name: string;
    company: string;
    description: string;
    image: string;
    website: string;
    twitterHandle: string;
    githubHandle: string;
    connectedAccounts: Array<{ id: number; service: string; username: string }>;
    email?: string;
    newsletterOptIn?: boolean;
  };
  tier: { interval: string; name: string };
}

interface MembersResponse {
  Collective: { currency: string; members: MemberRow[] };
}

type MembersVariables = {
  collectiveSlug?: string;
  limit?: number;
  role?: string;
  tierSlug?: string;
  backerType?: string;
  tierId?: number;
  offset?: number;
};

export async function list(
  req: Request<MembersParams, unknown, unknown, MembersQuery>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { collectiveSlug, eventSlug, role, tierSlug } = req.params;

  let backerType;
  switch (req.params.backerType) {
    case 'users':
      backerType = 'USER';
      break;
    case 'organizations':
      backerType = 'ORGANIZATION';
      break;
    default:
      backerType = null;
      break;
  }

  const headers: Record<string, string> = {};

  // Forward Api Key or Authorization header
  const apiKey = req.get('Api-Key') || req.query.apiKey;
  const personalToken = req.get('Personal-Token') || req.query.personalToken;
  const authorization = req.get('Authorization');
  if (authorization) {
    headers['Authorization'] = authorization;
  } else if (apiKey) {
    headers['Api-Key'] = apiKey;
  } else if (personalToken) {
    headers['Personal-Token'] = personalToken;
  }

  const query = gqlV1 /* GraphQL */ `
    query CollectiveMembers(
      $collectiveSlug: String
      $backerType: String
      $tierSlug: String
      $tierId: Int
      $limit: Int
      $offset: Int
      $role: String
    ) {
      Collective(slug: $collectiveSlug) {
        currency

        members(type: $backerType, role: $role, tierSlug: $tierSlug, TierId: $tierId, limit: $limit, offset: $offset) {
          id
          createdAt
          role
          stats {
            totalDonations
          }
          transactions(limit: 1) {
            createdAt
            amount
            currency
          }
          isActive
          member {
            type
            slug
            name
            company
            description
            image
            website
            twitterHandle
            githubHandle
            connectedAccounts {
              id
              service
              username
            }
            ... on User {
              email
              newsletterOptIn
            }
          }
          tier {
            interval
            name
          }
        }
      }
    }
  `;
  const vars: MembersVariables = { collectiveSlug: eventSlug || collectiveSlug, limit: 1000 };
  if (role === 'attendees') {
    vars.role = 'ATTENDEE';
  }
  if (role === 'organizers') {
    vars.role = 'ADMIN';
  }
  if (tierSlug) {
    vars.tierSlug = tierSlug;
  }
  if (backerType) {
    vars.backerType = backerType;
  }
  if (req.query.TierId) {
    vars.tierId = Number(req.query.TierId);
  }
  if (req.query.limit) {
    vars.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    vars.offset = Number(req.query.offset);
  }

  let result: MembersResponse;
  try {
    result = await graphqlRequest<MembersResponse>(query, vars, { headers });
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.debug('>>> members.list error', err);
    return next(err);
  }

  const members = result.Collective.members;

  const mapping = {
    MemberId: 'id',
    createdAt: (r: MemberRow) => moment(new Date(r.createdAt)).format('YYYY-MM-DD HH:mm'),
    type: 'member.type',
    role: 'role',
    tier: 'tier.name',
    isActive: 'isActive',
    totalAmountDonated: (r: MemberRow) => (get(r, 'stats.totalDonations') || 0) / 100,
    currency: 'transactions[0].currency',
    lastTransactionAt: (r: MemberRow) => {
      return moment(r.transactions[0] && new Date(r.transactions[0].createdAt)).format('YYYY-MM-DD HH:mm');
    },
    lastTransactionAmount: (r: MemberRow) => (get(r, 'transactions[0].amount') || 0) / 100,
    profile: (r: MemberRow) => `${process.env.WEBSITE_URL}/${r.member.slug}`,
    name: 'member.name',
    company: 'member.company',
    description: 'member.description',
    image: 'member.image',
    email: 'member.email',
    newsletterOptIn: 'member.newsletterOptIn',
    twitter: (r: MemberRow) => {
      return r.member.twitterHandle ? `https://twitter.com/${r.member.twitterHandle}` : null;
    },
    github: (r: MemberRow) => {
      if (r.member.githubHandle) {
        return `https://github.com/${r.member.githubHandle}`;
      }
      const githubAccount = (r.member.connectedAccounts || []).find((c) => c.service === 'github');
      return githubAccount ? `https://github.com/${githubAccount.username}` : null;
    },
    website: 'member.website',
  };

  const fields = Object.keys(mapping);

  const applyMapping = (row: MemberRow) => {
    const res = {};
    fields.map((key) => {
      const val = mapping[key];
      if (typeof val === 'function') {
        return (res[key] = val(row));
      } else {
        return (res[key] = get(row, val));
      }
    });
    return res;
  };

  const data = members.map(applyMapping);

  switch (req.params.format) {
    case 'csv': {
      const csv = json2csv(data, fields);
      res.setHeader('content-type', 'text/csv');
      res.send(csv);
      break;
    }

    default:
      res.send(data);
      break;
  }
}
