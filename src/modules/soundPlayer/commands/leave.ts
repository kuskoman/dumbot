import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class LeaveCommand implements Command {
  public name = "leave";
  public patterns = ["leave", "l"];
  public execute({ msg }: CommandOpts): any {
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    player.queue.reset();

    if (player.dispatcher) {
      player.dispatcher.end();
    }

    const voiceChannel = msg.member?.voice?.channel;
    if (!voiceChannel) {
      return msg.channel.send(
        `Can\t find voice channel to leave. Join channel and try again.`
      );
    }
    voiceChannel.leave();
  }
}

const leave = new LeaveCommand();
export default leave;
