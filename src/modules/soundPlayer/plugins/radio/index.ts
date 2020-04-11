import { Msg } from "../../../../types";
import { recogniseRadioStation } from "./stationFinder";
import { Song } from "../../song";

export const getRadio = (msg: Msg, query: string) => {
  const foundStation = recogniseRadioStation(query);
  if (!foundStation) {
    return undefined;
  }

  const radioStation: Song = {
    name: foundStation.name,
    getStream() {
      return foundStation.url;
    },
    addedBy: msg.member?.id || "unknown",
  };

  return radioStation;
};
