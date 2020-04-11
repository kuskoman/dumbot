import * as stations from "./stations.json";

export const listStations = (): string => {
  let stationsString = "Aviable stations:\n";

  for (const [key, properties] of Object.entries(stations)) {
    stationsString += `**${properties.name}** alias \`${key}\` language: ${properties.lang}\n`;
  }

  return stationsString;
};
