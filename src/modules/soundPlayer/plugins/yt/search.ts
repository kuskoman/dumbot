import youtubeSearch from "youtube-search";
import { promisify } from "util";

export const getSongDataFromYT = async (
  query: string
): Promise<GetSongDataFromYTResponse | undefined> => {
  const opts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 1,
    key: process.env.YT_API_KEY,
  };

  const search = promisify(youtubeSearch);
  const response = await search(query, opts);

  if (!response) {
    return undefined;
  }

  const song = response[0];
  return {
    name: song.title,
    id: song.id,
    link: song.link,
  };
};

export interface GetSongDataFromYTResponse {
  id: string;
  name: string;
  link: string;
}
