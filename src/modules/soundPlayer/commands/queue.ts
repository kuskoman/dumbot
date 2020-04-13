import { CommandOpts, Command } from "../../../module";
import { SoundPlayer } from "../player";

export class QueueCommand implements Command {
  public name = "queue";
  public patterns = ["q", "queue"];
  public execute({ msg }: CommandOpts): any {
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    const songList = player.queue.songList;
    if (songList.length < 1) {
      msg.channel.send("No songs in queue");
      return;
    }

    let queueString = "";

    for (let i = 0; i < songList.length; i++) {
      const song = songList[i];
      queueString += `#${i + 1}: ${song.name}\n`;
    }

    msg.channel.send(queueString);
  }
}

const queue = new QueueCommand();
export default queue;
