import { CommandOpts } from "../types";
import { play } from "../musicPlayer/player";

export default {
  name: "play",
  pattern: ["play", "p"],
  execute({ msg }: CommandOpts) {
    play(msg);
  }
};
