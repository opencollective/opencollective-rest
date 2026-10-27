declare module 'omit-deep-lodash' {
  const omitDeep: <T>(input: T, props: string[]) => T;
  export default omitDeep;
}
