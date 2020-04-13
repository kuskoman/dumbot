import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class CurrentCommand implements Command {
  public name = "current";
  public patterns = ["current", "c"];
  public execute({ msg }: CommandOpts): any {
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    const currentSong = player.queue.currentSong;
    if (!currentSong) {
      msg.channel.send("Bot isn't currently playing song");
      return;
    }

    msg.channel.send(`Current song: ${currentSong.name}`);
  }
}

const current = new CurrentCommand();
export default current;
