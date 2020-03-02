import moment from 'moment';
import gql from 'graphql-tag';
import { get } from 'lodash';

import { logger } from '../logger';
import { getClient } from '../lib/graphql';
import { days, json2csv } from '../lib/utils';

export async function list(req, res, next) {
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

  const headers = {};
  if (req.headers.authorization) {
    res.setHeader('cache-control', 'no-cache'); // don't cache at CDN level as the result contains private information
    headers.authorization = req.headers.authorization;
  }

  const query = gql`
    query Collective(
      $collectiveSlug: String
      $backerType: String
      $tierSlug: String
      $TierId: Int
      $limit: Int
      $offset: Int
      $role: String
    ) {
      Collective(slug: $collectiveSlug) {
        currency
        members(type: $backerType, role: $role, tierSlug: $tierSlug, TierId: $TierId, limit: $limit, offset: $offset) {
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
          member {
            type
            slug
            type
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
            ... on Organization {
              email
            }
            ... on User {
              email
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
  const variables = { collectiveSlug: eventSlug || collectiveSlug };
  if (role === 'attendees') variables.role = 'ATTENDEE';
  if (role === 'followers') variables.role = 'FOLLOWER';
  if (role === 'organizers') variables.role = 'ADMIN';
  if (tierSlug) variables.tierSlug = tierSlug;
  if (backerType) variables.backerType = backerType;
  if (req.query.TierId) variables.TierId = Number(req.query.TierId);
  if (req.query.limit) variables.limit = Number(req.query.limit);
  if (req.query.offset) variables.offset = Number(req.query.offset);

  // Only return max 50 at a time
  if (req.params.format === 'json') {
    variables.limit = Math.min(req.query.limit, 50);
  }

  let result;
  try {
    result = await getClient().query({ query, variables });
  } catch (err) {
    if (err.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    }
    logger.debug('>>> members.list error', err);
    return next(err);
  }

  const members = result.data.Collective.members;

  const isActive = r => {
    if (!r.tier || !r.tier.interval) return true;
    if (!r.transactions[0] || !r.transactions[0].createdAt) return false;
    if (r.tier.interval === 'month' && days(new Date(r.transactions[0].createdAt)) <= 31) return true;
    if (r.tier.interval === 'year' && days(new Date(r.transactions[0].createdAt)) <= 365) return true;
    return false;
  };

  const mapping = {
    MemberId: 'id',
    createdAt: r => moment(new Date(r.createdAt)).format('YYYY-MM-DD HH:mm'),
    type: 'member.type',
    role: 'role',
    tier: 'tier.name',
    isActive: isActive,
    totalAmountDonated: r => (get(r, 'stats.totalDonations') || 0) / 100,
    currency: 'transactions[0].currency',
    lastTransactionAt: r => {
      return moment(r.transactions[0] && new Date(r.transactions[0].createdAt)).format('YYYY-MM-DD HH:mm');
    },
    lastTransactionAmount: r => (get(r, 'transactions[0].amount') || 0) / 100,
    profile: r => `${process.env.WEBSITE_URL}/${r.member.slug}`,
    name: 'member.name',
    company: 'member.company',
    description: 'member.description',
    image: 'member.image',
    email: 'member.email',
    twitter: r => {
      return r.member.twitterHandle ? `https://twitter.com/${r.member.twitterHandle}` : null;
    },
    github: r => {
      if (r.member.githubHandle) {
        return `https://github.com/${r.member.githubHandle}`;
      }
      const githubAccount = r.member.connectedAccounts.find(c => c.service === 'github');
      return githubAccount ? `https://github.com/${githubAccount.username}` : null;
    },
    website: 'member.website',
  };

  const fields = Object.keys(mapping);

  const applyMapping = row => {
    const res = {};
    fields.map(key => {
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
      const csv = json2csv(data);
      res.setHeader('content-type', 'text/csv');
      res.send(csv);
      break;
    }

    default:
      res.send(data);
      break;
  }
}
