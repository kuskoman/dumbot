import * as stations from "./stations.json";
import { Station } from "./stations";

export const recogniseRadioStation = (query: string): Station | undefined => {
  if (Object.keys(stations).includes(query)) {
    return stations[query] as Station;
  }
  return undefined;
};
