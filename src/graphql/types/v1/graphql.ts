/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type CollectiveMembersQueryVariables = Exact<{
  collectiveSlug?: string | null | undefined;
  backerType?: string | null | undefined;
  tierSlug?: string | null | undefined;
  tierId?: number | null | undefined;
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  role?: string | null | undefined;
}>;

export type CollectiveMembersQuery = {
  Collective:
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | {
        currency: string | null;
        members: Array<{
          id: number | null;
          createdAt: any;
          role: string | null;
          isActive: boolean;
          stats: { totalDonations: number | null } | null;
          transactions: Array<
            | { createdAt: any; amount: number | null; currency: string | null }
            | { createdAt: any; amount: number | null; currency: string | null }
            | null
          > | null;
          member:
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                email: string | null;
                newsletterOptIn: boolean | null;
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | {
                type: string | null;
                slug: string | null;
                name: string | null;
                company: string | null;
                description: string | null;
                image: string | null;
                website: string | null;
                twitterHandle: string | null;
                githubHandle: string | null;
                connectedAccounts: Array<{
                  id: number | null;
                  service: string | null;
                  username: string | null;
                } | null> | null;
              }
            | null;
          tier: { interval: string | null; name: string | null } | null;
        } | null> | null;
      }
    | null;
};

export type AllTransactionsQueryVariables = Exact<{
  collectiveSlug: string;
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  type?: string | null | undefined;
}>;

export type AllTransactionsQuery = {
  allTransactions: Array<
    | {
        id: number | null;
        uuid: string | null;
        type: string | null;
        amount: number | null;
        currency: string | null;
        hostCurrency: string | null;
        hostCurrencyFxRate: number | null;
        hostFeeInHostCurrency: number | null;
        platformFeeInHostCurrency: number | null;
        paymentProcessorFeeInHostCurrency: number | null;
        netAmountInCollectiveCurrency: number | null;
        createdAt: any;
        host: { id: number | null; slug: string | null } | null;
        createdByUser: { id: number | null; email: string | null } | null;
        fromCollective:
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | null;
        collective:
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | null;
        paymentMethod: { id: number | null; service: string | null; name: string | null } | null;
      }
    | {
        id: number | null;
        uuid: string | null;
        type: string | null;
        amount: number | null;
        currency: string | null;
        hostCurrency: string | null;
        hostCurrencyFxRate: number | null;
        hostFeeInHostCurrency: number | null;
        platformFeeInHostCurrency: number | null;
        paymentProcessorFeeInHostCurrency: number | null;
        netAmountInCollectiveCurrency: number | null;
        createdAt: any;
        host: { id: number | null; slug: string | null } | null;
        createdByUser: { id: number | null; email: string | null } | null;
        fromCollective:
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | null;
        collective:
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | { id: number | null; slug: string | null; name: string | null; image: string | null }
          | null;
        paymentMethod: { id: number | null; service: string | null; name: string | null } | null;
      }
    | null
  > | null;
};

export const CollectiveMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CollectiveMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'collectiveSlug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'backerType' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tierSlug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tierId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Collective' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'collectiveSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'members' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'backerType' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'role' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'tierSlug' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'tierSlug' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'TierId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'tierId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stats' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalDonations' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactions' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'company' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'twitterHandle' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'githubHandle' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'connectedAccounts' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'service' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                ],
                              },
                            },
                            {
                              kind: 'InlineFragment',
                              typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'newsletterOptIn' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tier' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'interval' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectiveMembersQuery, CollectiveMembersQueryVariables>;
export const AllTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AllTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'collectiveSlug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allTransactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'collectiveSlug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'collectiveSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hostCurrency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hostCurrencyFxRate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hostFeeInHostCurrency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'platformFeeInHostCurrency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentProcessorFeeInHostCurrency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'netAmountInCollectiveCurrency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'host' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'createdByUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fromCollective' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collective' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'service' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllTransactionsQuery, AllTransactionsQueryVariables>;
