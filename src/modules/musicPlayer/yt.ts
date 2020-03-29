import youtubeSearch from "youtube-search";
import { Msg } from "src/types";
import { Song } from "./song";
import { promisify } from "util";
import { getInfo } from "ytdl-core";

// regex source: https://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links
const YT_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
// todo: make regex matching link only if query is one word

export const getSongData = async (msg: Msg, query: string): Promise<Song> => {
  if (!query || query.length < 3) {
    msg.channel.send("Query missing or query length shorter than 3.");
    throw new Error("Query too short or not present");
  }

  const link = extractYouTubeLink(query);
  if (link) {
    const songData = await getInfo(link);
    const song: Song = {
      name: songData.title,
      id: songData.video_id,
      link,
      addedBy: msg.member.id
    };
    return song;
  }

  const songData = await searchSongOnYT(query);
  const song: Song = {
    ...songData,
    addedBy: msg.member.id
  };
  return song;
};

const searchSongOnYT = async (
  query: string
): Promise<GetSongDataFromYTResponse> => {
  const opts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 1,
    key: process.env.YT_API_KEY
  };

  const search = promisify(youtubeSearch);
  const response = await search(query, opts);
  const song = response[0];
  return {
    name: song.title,
    id: song.id,
    link: song.link
  };
};

const extractYouTubeLink = (possibleLink: string): string | undefined => {
  const matches = possibleLink.match(YT_REGEX);
  if (matches && matches[1]) {
    const id = matches[1];
    return `https://www.youtube.com/watch?v=${id}`;
  }
  return undefined;
};

export interface GetSongDataFromYTResponse {
  id: string;
  name: string;
  link: string;
}
