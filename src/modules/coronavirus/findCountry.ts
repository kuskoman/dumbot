import { CountryData } from "./api";

export const findCountry = (
  data: CountryData[],
  query: string
): CountryData | undefined => {
  const matchesQuery = (c: CountryData): boolean => {
    return (
      c.CountryCode.toLowerCase() === query ||
      c.Slug.toLowerCase() === query ||
      c.Country.toLowerCase() === query
    );
  };
  return data.find(matchesQuery);
};
