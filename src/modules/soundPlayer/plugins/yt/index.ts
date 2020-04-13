import { Msg } from "../../../../types";
import { Song } from "../../song";
import { extractYouTubeLink } from "./utils";
import { getInfo } from "ytdl-core";
import { getSongDataFromYT } from "./search";
import ytdl from "ytdl-core";

// regex source: https://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links
export const YT_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
// todo: make regex matching link only if query is one word

export const getSongFromYouTube = async (
  msg: Msg,
  query: string
): Promise<Song | undefined> => {
  const link = extractYouTubeLink(query);
  const addedBy = msg.member?.id || "unknown";
  if (link) {
    const songData = await getInfo(link);
    const song: Song = {
      name: songData.title,
      id: songData.video_id,
      addedBy,
      getStream() {
        return ytdl(link, { liveBuffer: 30000 });
      },
    };
    return song;
  }

  const songData = await getSongDataFromYT(query);

  if (!songData) {
    return undefined;
  }

  const song: Song = {
    name: songData.name,
    id: songData.id,
    addedBy,
    getStream() {
      return ytdl(songData.link);
    },
  };
  return song;
};
