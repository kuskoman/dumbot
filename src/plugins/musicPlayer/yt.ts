import youtubeSearch from "youtube-search";
import { Msg } from "src/types";
import { Song } from "./song";
import { promisify } from "util";

export const getSongDataFromYT = async (
  query: string
): Promise<GetSongDataFromYTResponse> => {
  const opts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 1,
    key: process.env.YT_API_KEY
  };

  console.log(`Looking for song ${query} on YouTube.`);
  const search = promisify(youtubeSearch);
  const response = await search(query, opts);
  const song = response[0];
  return {
    name: song.title,
    id: song.id,
    link: song.link
  };
};

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

export interface GetSongDataFromYTResponse {
  id: string;
  name: string;
  link: string;
}
