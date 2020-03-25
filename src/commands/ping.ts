import { CommandOpts } from "../types";

export default {
  name: "ping",
  pattern: ["ping"],
  execute({ msg }: CommandOpts) {
    msg.channel.send("pong");
  }
};
