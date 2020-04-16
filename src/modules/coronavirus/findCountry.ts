import { CountryData } from "./api";

export const findCountry = (
  data: CountryData[],
  query: string
): CountryData | undefined => {
  return data.find((c) => {
    return c.CountryCode === query || c.Slug === query || c.Country === query;
  });
};
