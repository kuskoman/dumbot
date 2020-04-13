import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class ClearQueueCommand implements Command {
  public name = "stop";
  public patterns = ["clear", "cq", "clear queue", "clearqueue"];
  public execute({ msg }: CommandOpts): any {
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    player.queue.reset();
    msg.channel.send("Queue cleared");
  }
}

const clearQueue = new ClearQueueCommand();
export default clearQueue;
