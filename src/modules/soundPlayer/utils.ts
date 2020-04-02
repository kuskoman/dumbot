import { Msg } from "../../types";

export const joinChannel = async (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    await channel.join();
    console.log(`Joined channel ${channel.id}`);
    return channel;
  }
  msg.channel.send("You must be in a voice channel first");
  return false;
};
