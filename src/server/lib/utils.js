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
