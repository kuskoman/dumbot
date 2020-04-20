import axios from "axios";
import logger from "../../logger";

const API_URL = "https://api.covid19api.com/";

export class CovidApiClient {
  private url: string = API_URL;
  private cache: Map<string, CacheObject> = new Map();
  public async getSummary(): Promise<CovidApiData> {
    const currentTime = +new Date();
    const cachedData = this.cache.get("globalSummary");
    if (cachedData && currentTime - cachedData.timestamp < 360 * 1000) {
      return cachedData.data;
    }
    const fullAddress = `${this.url}summary`;
    logger.http(`Sending api request to ${fullAddress}`);
    const response = await axios.get(fullAddress);
    const data = response.data as CovidApiData;
    const cacheObject = { timestamp: currentTime, data };
    this.cache.set("globalSummary", cacheObject);
    return data;
  }
}

const api = new CovidApiClient();
export default api;

export interface CovidApiData {
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
  };
  Countries: CountryData[];
}

export interface CountryData {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}

interface CacheObject {
  timestamp: number;
  data: any;
}
