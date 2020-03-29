import youtubeSearch from "youtube-search";
import { Msg } from "src/types";
import { Song } from "./song";
import { promisify } from "util";
import { getInfo } from "ytdl-core";

const YT_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
// regex source: https://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links

export const getSongData = async (msg: Msg, query: string): Promise<Song> => {
  if (!query || query.length < 3) {
    msg.channel.send("Query missing or query length shorter than 3.");
    throw new Error("Query too short or not present");
  }

  const songData = await getSongDataFromYT(query);
  const song = {
    ...songData,
    addedBy: msg.member.id
  };
  return song;
};

const getSongDataFromYT = async (
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
