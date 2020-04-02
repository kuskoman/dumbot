import * as stations from "./stations.json";
import { Msg } from "../../../../types";
import { RadioBroadcast } from "./broadcasts";
import { matchExact } from "./utils";
import { Song } from "../../song";

const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const getRadio = (msg: Msg, query: string): Song => {
  const radio: Song = {
    addedBy: msg.member.id,
    getStream() {
      return playRadio(msg, query);
    }
  };

  return radio;
};

const playRadio = (msg: Msg, query: string) => {
  const identifier = query.trim();
  const url = getRadioUrl(identifier);
  if (!url) {
    msg.channel.send(
      `Can't create broadcast: ${identifier} is not a valid radio identifier.`
    );
    return undefined;
  }

  const broadcast = RadioBroadcast.get(url);
  return broadcast.join(msg.guild.id);
};

const getRadioUrl = (identifier: string) => {
  const prefefinedStation = stations[identifier];
  if (prefefinedStation) {
    return prefefinedStation;
  }

  if (matchExact(linkRegex, identifier)) {
    return identifier;
  }

  return false;
};
