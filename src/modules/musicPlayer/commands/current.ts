import { CommandOpts, Command } from "../../../module";
import { MusicPlayer } from "../player";

export class CurrentCommand implements Command {
  public name = "current";
  public patterns = ["current", "c"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
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
