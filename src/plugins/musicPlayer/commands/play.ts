import { CommandOpts, Command } from "../../../plugin";
import { MusicPlayer } from "../player";

export class PlayCommand implements Command {
  public name = "play";
  public patterns = ["play", "p"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    player.play(msg);
  }
}

const play = new PlayCommand();
export default play;
