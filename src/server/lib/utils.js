import { isNaN } from 'lodash';

/**
 * Gives the number of days between two dates
 */
export const days = (d1, d2 = new Date()) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((new Date(d1).getTime() - new Date(d2).getTime()) / oneDay));
};

export function json2csv(json) {
  const lines = [`"${Object.keys(json[0]).join('","')}"`];
  json.forEach(row => {
    lines.push(
      `"${Object.values(row)
        .map(td => {
          if (typeof td === 'string') return td.replace(/"/g, '""').replace(/\n/g, '  ');
          else return `${td || ''}`;
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
