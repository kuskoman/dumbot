import { Msg } from "../../../../types";
import { Song } from "../../song";
import { extractYouTubeLink } from "./utils";
import { getInfo } from "ytdl-core";
import { getSongDataFromYT } from "./search";

// regex source: https://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links
export const YT_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
// todo: make regex matching link only if query is one word

export const getSongFromYouTube = async (
  msg: Msg,
  query: string
): Promise<Song> => {
  const link = extractYouTubeLink(query);
  if (link) {
    const songData = await getInfo(link);
    const song: Song = {
      name: songData.title,
      id: songData.video_id,
      uri: link,
      addedBy: msg.member.id
    };
    return song;
  }

  const songData = await getSongDataFromYT(query);
  const song: Song = {
    ...songData,
    addedBy: msg.member.id
  };
  return song;
};
