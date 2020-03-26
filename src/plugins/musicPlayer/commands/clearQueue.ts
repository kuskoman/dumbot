import { CommandOpts, Command } from "../../../plugin";
import { MusicPlayer } from "../player";

export class ClearQueueCommand implements Command {
  public name = "stop";
  public patterns = ["clear", "cq", "clear queue", "clearqueue"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    player.queue.reset();
  }
}

const clearQueue = new ClearQueueCommand();
export default clearQueue;
