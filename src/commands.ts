import { Msg } from "./types";
import { scrapSongDataFromYT } from "./scraper";
import ytdl from "ytdl-core";

export const handleSong = async (msg: Msg, query: string) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
    return;
  }

  const connection = msg.guild.voice.connection;
  const { link, title } = await scrapSongDataFromYT(query);

  msg.channel.send(`Now playing: ${title}`);
  connection.play(ytdl(link)).on("finish", () => {
    console.log(`Song ${title} finished playing.`);
  });
};

export const handleJoin = (msg: Msg) => {
  joinChannel(msg);
};

const joinChannel = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};

export const handlePause = (msg: Msg) => {};
