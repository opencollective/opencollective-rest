# Open Collective REST API

[![Dependency Status](https://david-dm.org/opencollective/opencollective-rest/status.svg)](https://david-dm.org/opencollective/opencollective-rest)

## Foreword

If you see a step below that could be improved (or is outdated), please update the instructions. We rarely go through this process ourselves, so your fresh pair of eyes and your recent experience with it, makes you the best candidate to improve them for other users. Thank you!

## Development

### Prerequisite

1. Make sure you have Node.js version >= 16.

- We recommend using [nvm](https://github.com/creationix/nvm): `nvm install && nvm use`.

### Install

We recommend cloning the repository in a folder dedicated to `opencollective` projects.

```
git clone git@github.com:opencollective/opencollective-rest.git opencollective/rest
cd opencollective/rest
npm install
```

### Environment variables

This project requires an access to the Open Collective API. You have two options:

- `cp .env.staging .env` to connect to the Open Collective staging API
- `cp .env.local .env` to connect to the API running locally

If you decide to pick the local strategy, make sure you install and run the [opencollective-api](https://github.com/opencollective/opencollective-api) project.

### Start

```
npm run dev
```

## Contributing

Code style? Commit convention? Please check our [Contributing guidelines](CONTRIBUTING.md).

TL;DR: we use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/), we do like great commit messages and clean Git history.

## Tests

After starting the API and REST services locally, you can run the tests using `npm test` or more specifically:

- `npm run test:server`

To update:

- GraphQL schema for eslint: run `npm run graphql:update`

## Deployment

To deploy to staging or production, you need to be a core member of the Open Collective team.

### (Optional) Configure Slack token

Setting a Slack token will post a message on `#engineering` with the changes you're
about to deploy. It is not required, but you can activate it like this:

1. Go to https://api.slack.com/custom-integrations/legacy-tokens
2. Generate a token for the OpenCollective workspace
3. Add this token to your `.env` file:

```bash
OC_SLACK_DEPLOY_WEBHOOK=https://hooks.slack.com/services/....
```

### Staging (heroku)

```bash
# Before first deployment, configure staging remote
git remote add staging https://git.heroku.com/oc-staging-rest-api.git

# Then deploy main with
npm run deploy:staging
```

URL: https://rest-staging.opencollective.com/

### Production (heroku)

```bash
# Before first deployment, configure production remote
git remote add production https://git.heroku.com/oc-prod-rest-api.git

# Then deploy main with
npm run deploy:production
```

URL: https://rest.opencollective.com/

## Discussion

If you have any questions, ping us on [Discord](https://discord.opencollective.com).

### Turborepo tasks

Use the usual npm commands: `npm run build`, `npm run lint`, `npm test`,
`npm run type:check`, and `npm run format:check`. They run through
Turbo by default. Development and watch commands remain uncached; checks and
compilation use the declared cache inputs and dependency graph.

Forward runner arguments as usual, for example `npm test -- path/to/test`.
Internal `:task` scripts contain the underlying commands and are scheduled directly
by the parent workspace to avoid invoking Turbo recursively. For advanced Turbo
options, use `npm run turbo -- run lint:task --dry=json`. Standalone installs
keep this repository's own lockfile.

### Remote cache in CI

CI uses Vercel Remote Cache through GitHub OIDC for repository branch pushes and
same-repository pull requests. Fork PRs and runs without `TURBO_TEAM` use local
caching. The organization-level `TURBO_TEAM` Actions variable is already available
in this repository; no `TURBO_TOKEN` repository secret is needed.

In Vercel team Settings → Build and Deployment → OIDC Policies for CLI Access,
create or update a Turborepo CLI policy for `opencollective/opencollective-rest` and
`.github/workflows/ci.yml`. Allow branch-push and pull-request claims, use the
default audience, and remove any main-only branch restriction. Keep repository
and workflow restrictions, and update existing policies instead of creating
overlapping ones. The pinned setup action exchanges GitHub OIDC tokens for a
short-lived cache token before Turbo runs and revokes it at job completion.

Integration jobs authenticate before building the companion API, so both builds
can use the same team cache. Database setup and service tests remain uncached.

See [Vercel's OIDC setup](https://vercel.com/docs/monorepos/remote-caching/external-ci-cd#create-an-oidc-policy).
