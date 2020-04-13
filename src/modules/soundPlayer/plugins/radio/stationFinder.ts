import * as stations from "./stations.json";
import { Station } from "./stations";

export const recogniseRadioStation = (query: string): Station | undefined => {
  const stationsJson = stations as StationsList;
  if (Object.keys(stationsJson).includes(query)) {
    return stationsJson[query] as Station;
  }
  return undefined;
};

interface StationsList {
  [key: string]: StationData;
}

interface StationData {
  name: string;
  url: string;
  country: string;
}
