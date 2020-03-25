import { Msg } from "./types";

export const handleSong = () => {
  console.log("dupa");
};

export const handleJoin = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};
