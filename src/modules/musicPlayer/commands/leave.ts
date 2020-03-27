import { CommandOpts, Command } from "../../../module";
import { MusicPlayer } from "../player";

export class LeaveCommand implements Command {
  public name = "leave";
  public patterns = ["leave", "l"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    player.queue.reset();
    if (player.dispatcher) {
      player.dispatcher.end();
    }
    msg.member.voice.channel.leave();
  }
}

const leave = new LeaveCommand();
export default leave;
