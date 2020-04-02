export const matchExact = (r, str) => {
  const match = str.match(r);
  return match && str === match[0];
};
