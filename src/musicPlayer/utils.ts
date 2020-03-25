import { Msg } from "../types";
import { Song } from "./song";
import { scrapSongDataFromYT } from "./scraper";

export const joinChannel = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
    return;
  }
};

export const getSongData = async (msg: Msg, query: string): Promise<Song> => {
  if (!query || query.length < 3) {
    msg.channel.send("Query missing or query length shorter than 3.");
    throw new Error("Query too short or not present");
  }
  const { id, name } = await scrapSongDataFromYT(query);
  const song = {
    name,
    id,
    addedBy: msg.member.id,
    url: `https://www.youtube.com/watch?v=${id}`
  };
  return song;
};
