import { Msg } from "../../types";

export const joinChannel = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
    console.log(`Joined channel ${channel.id}`);
  } else {
    msg.channel.send("You must be in a voice channel first");
    return;
  }
};
