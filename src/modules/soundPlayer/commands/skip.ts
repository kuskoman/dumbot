import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class SkipCommand implements Command {
  public name = "skip";
  public patterns = ["skip", "s"];
  public execute({ msg }: CommandOpts) {
    const player = SoundPlayer.get(msg.guild.id);
    player.skip(msg);
  }
}

const skip = new SkipCommand();
export default skip;
