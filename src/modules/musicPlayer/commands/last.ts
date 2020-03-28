import { CommandOpts, Command } from "../../../module";
import { MusicPlayer } from "../player";

export class LastCommand implements Command {
  public name = "last";
  public patterns = ["last", "ls", "last song", "lastsong"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    const lastSong = player.queue.lastSong;
    if (!lastSong) {
      msg.channel.send("No songs played on this server in current bot session");
      return;
    }

    msg.channel.send(`Last song played: ${lastSong.name}`);
  }
}

const last = new LastCommand();
export default last;
