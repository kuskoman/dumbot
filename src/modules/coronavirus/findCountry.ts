import { CountryData } from "./api";

export const findCountry = (
  data: CountryData[],
  query: string
): CountryData | undefined => {
  return data.find((c) => {
    return (
      c.CountryCode.toLowerCase() === query ||
      c.Slug.toLowerCase() === query ||
      c.Country.toLowerCase() === query
    ); // todo: map lowercase or smth
  });
};
