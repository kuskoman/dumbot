import { Msg } from "../types";

export const join = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};
