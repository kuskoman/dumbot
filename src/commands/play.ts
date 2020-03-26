import { CommandOpts } from "../types";
import { MusicPlayer } from "../musicPlayer/player";

export default {
  name: "play",
  pattern: ["play", "p"],
  execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    player.play(msg);
  }
};
