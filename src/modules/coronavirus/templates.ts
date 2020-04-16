import { CountryData } from "./api";

export const formatCountryData = (data: CountryData): string => {
  return `:flag_${data.CountryCode.toLowerCase()}: ${data.Country}:
    New cases: ${data.NewConfirmed}
    Total cases: ${data.TotalConfirmed}
    New deaths: ${data.NewDeaths}
    Total deaths: ${data.TotalDeaths}
    New recovered: ${data.NewRecovered}
    Total recovered: ${data.TotalRecovered}
  Date: ${data.Date.toLocaleDateString()}`;
};
