import { isNaN } from 'lodash';

export const getBaseApiUrl = () => {
  return process.env.API_URL;
};

export const getGraphqlUrl = ({ apiKey, version } = {}) => {
  if (apiKey) {
    return `${getBaseApiUrl()}/graphql/${version || 'v1'}?apiKey=${apiKey}`;
  } else {
    return `${getBaseApiUrl()}/graphql/${version || 'v1'}?api_key=${process.env.API_KEY}`;
  }
};

/**
 * Gives the number of days between two dates
 */
export const days = (d1, d2 = new Date()) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((new Date(d1).getTime() - new Date(d2).getTime()) / oneDay));
};

export function json2csv(json) {
  const lines = [`"${Object.keys(json[0]).join('","')}"`];
  json.forEach((row) => {
    lines.push(
      `"${Object.values(row)
        .map((td) => {
          if (typeof td === 'string') {
            return td.replace(/"/g, '""').replace(/\n/g, '  ');
          } else if (td !== undefined && td !== null) {
            return td;
          } else {
            return '';
          }
        })
        .join('","')}"`,
    );
  });
  return lines.join('\n');
}

function isUUID(str) {
  return str.length === 36 && str.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
}

function parseIdOrUUID(param) {
  if (isUUID(param)) {
    return Promise.resolve({ uuid: param });
  }

  const id = parseInt(param);

  if (isNaN(id)) {
    return Promise.reject(new Error('This is not a correct id.'));
  } else {
    return Promise.resolve({ id });
  }
}

export function idOrUuid(req, res, next, idOrUuid) {
  parseIdOrUUID(idOrUuid)
    .then(({ id, uuid }) => {
      if (id) {
        req.params.id = id;
      }
      if (uuid) {
        req.params.uuid = uuid;
      }
      next();
    })
    .catch(next);
}

export const parseToBooleanDefaultFalse = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }
  const string = value.toString().trim().toLowerCase();
  return ['on', 'enabled', '1', 'true', 'yes', 1].includes(string);
};

export const parseToBooleanDefaultTrue = (value) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  const string = value.toString().trim().toLowerCase();
  return !['off', 'disabled', '0', 'false', 'no', 0].includes(string);
};
