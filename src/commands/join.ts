import { CommandOpts } from "../types";

export default {
  name: "join",
  pattern: ["join", "j"],
  execute({ msg }: CommandOpts) {
    const channel = msg.member.voice.channel;
    if (channel) {
      channel.join();
    } else {
      msg.channel.send("You must be in a voice channel first");
    }
  }
};
