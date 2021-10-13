import { Parser } from 'json2csv';
import { get } from 'lodash';

export function json2csv(data, opts) {
  const parser = new Parser(opts);
  return parser.parse(data);
}

export function applyMapping(mapping, row) {
  const res = {};
  Object.keys(mapping).map((key) => {
    const val = mapping[key];
    if (typeof val === 'function') {
      return (res[key] = val(row));
    } else {
      return (res[key] = get(row, val));
    }
  });
  return res;
}
