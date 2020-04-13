import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class SkipCommand implements Command {
  public name = "skip";
  public patterns = ["skip", "s"];
  public execute({ msg }: CommandOpts): any {
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    player.skip(msg);
  }
}

const skip = new SkipCommand();
export default skip;
