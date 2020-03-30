import { CommandOpts, Command } from "../../../module";
import { MusicPlayer } from "../player";

export class LeaveCommand implements Command {
  public name = "leave";
  public patterns = ["leave", "l"];
  public execute({ msg }: CommandOpts) {
    msg.member.voice.channel.leave();
    const player = MusicPlayer.get(msg.guild.id);
    player.queue.reset();
    player.dispatcher.end();
  }
}

const leave = new LeaveCommand();
export default leave;
