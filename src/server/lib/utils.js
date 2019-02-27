export const queryString = {
  stringify: obj => {
    let str = '';
    for (const key in obj) {
      if (str != '') {
        str += '&';
      }
      str += `${key}=${encodeURIComponent(obj[key])}`;
    }
    return str;
  },
  parse: query => {
    if (!query) return {};
    const vars = query.split('&');
    const res = {};
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return res;
  },
};

export const getBaseApiUrl = ({ internal } = {}) => {
  if (process.browser) {
    return '/api';
  } else if (internal && process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  } else {
    return process.env.API_URL || 'https://api.opencollective.com';
  }
};

export const getGraphqlUrl = () => {
  const apiKey = !process.browser ? process.env.API_KEY : null;
  return `${getBaseApiUrl()}/graphql${apiKey ? `?api_key=${apiKey}` : ''}`;
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
