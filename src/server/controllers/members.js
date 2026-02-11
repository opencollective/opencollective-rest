import { get } from 'lodash';
import moment from 'moment';

import { simpleGraphqlRequest } from '../lib/graphql';
import { json2csv, validateParams } from '../lib/utils';
import { logger } from '../logger';

// Simple tagged template that flattens the string instead of parsing it into a DocumentNode,
// because simpleGraphqlRequest (graphql-request) expects a raw string query, not an AST.
const gqlV1 = (string) => String(string).replace(`\n`, ` `).trim();

export async function list(req, res, next) {
  const isValid = validateParams(req.params, {
    format: ['json', 'csv'],
    backerType: ['all', 'users', 'organizations'],
    role: ['attendees', 'followers', 'organizers', 'all'],
  });
  if (!isValid) {
    return next();
  }

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
    query collectiveMembers(
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
          isActive
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
  const vars = { collectiveSlug: eventSlug || collectiveSlug, limit: 1000 };
  if (role === 'attendees') {
    vars.role = 'ATTENDEE';
  }
  if (role === 'followers') {
    vars.role = 'FOLLOWER';
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
    vars.TierId = Number(req.query.TierId);
  }
  if (req.query.limit) {
    vars.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    vars.offset = Number(req.query.offset);
  }

  let result;
  try {
    result = await simpleGraphqlRequest(query, vars, { headers });
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
    createdAt: (r) => moment(new Date(r.createdAt)).format('YYYY-MM-DD HH:mm'),
    type: 'member.type',
    role: 'role',
    tier: 'tier.name',
    isActive: 'isActive',
    totalAmountDonated: (r) => (get(r, 'stats.totalDonations') || 0) / 100,
    currency: 'transactions[0].currency',
    lastTransactionAt: (r) => {
      return moment(r.transactions[0] && new Date(r.transactions[0].createdAt)).format('YYYY-MM-DD HH:mm');
    },
    lastTransactionAmount: (r) => (get(r, 'transactions[0].amount') || 0) / 100,
    profile: (r) => `${process.env.WEBSITE_URL}/${r.member.slug}`,
    name: 'member.name',
    company: 'member.company',
    description: 'member.description',
    image: 'member.image',
    email: 'member.email',
    newsletterOptIn: 'member.newsletterOptIn',
    twitter: (r) => {
      return r.member.twitterHandle ? `https://twitter.com/${r.member.twitterHandle}` : null;
    },
    github: (r) => {
      if (r.member.githubHandle) {
        return `https://github.com/${r.member.githubHandle}`;
      }
      const githubAccount = r.member.connectedAccounts.find((c) => c.service === 'github');
      return githubAccount ? `https://github.com/${githubAccount.username}` : null;
    },
    website: 'member.website',
  };

  const fields = Object.keys(mapping);

  const applyMapping = (row) => {
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
