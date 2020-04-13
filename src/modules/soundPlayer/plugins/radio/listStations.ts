import * as stations from "./stations.json";

export const listStations = (): string => {
  let stationsString = "Aviable stations:\n";

  const entries = Object.entries(stations);
  const stationsList = entries.slice(0, entries.length - 1);
  for (const [key, properties] of stationsList) {
    stationsString += `:flag_${properties.country}: **${properties.name}** \`${key}\`\n`;
  }

  return stationsString;
};
