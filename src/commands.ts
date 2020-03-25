import { Msg } from "./types";
import ytdl from "ytdl-core";

export const handleSong = (msg: Msg) => {
  const connection = msg.guild.voice.connection;
  connection
    .play(ytdl("https://www.youtube.com/watch?v=cbKNICg-REA"))
    .on("finish", () => {
      console.log("koniec");
    });
};

export const handleJoin = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};
