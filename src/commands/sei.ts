import { CommandOpts } from "../types";

export default {
  name: "seicento",
  pattern: ["sei"],
  execute({ msg }: CommandOpts) {
    msg.channel.send("cento");
  }
};
