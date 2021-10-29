import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import debug from 'debug';
import dotenv from 'dotenv';
import lodash from 'lodash';

// Load extra env file on demand
// e.g. `npm run dev production` -> `.env.production`
const extraEnv = process.env.EXTRA_ENV || lodash.last(process.argv);
const extraEnvPath = path.join(__dirname, '..', `.env.${extraEnv}`);
if (fs.existsSync(extraEnvPath)) {
  dotenv.config({ path: extraEnvPath });
}

dotenv.config();
debug.enable(process.env.DEBUG);

const defaults = {
  PORT: 3003,
  NODE_ENV: 'development',
  REST_URL: 'http://localhost:3003',
  API_KEY: '09u624Pc9F47zoGLlkg1TBSbOl2ydSAq',
  API_URL: 'https://api-staging.opencollective.com',
  WEBSITE_URL: 'https://staging.opencollective.com',
  OC_APPLICATION: 'rest',
  OC_ENV: process.env.NODE_ENV || 'development',
  OC_SECRET: crypto.randomBytes(16).toString('hex'),
};

for (const key in defaults) {
  if (process.env[key] === undefined) {
    process.env[key] = defaults[key];
  }
}
