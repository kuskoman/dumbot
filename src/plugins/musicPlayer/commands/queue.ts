import { CommandOpts, Command } from "../../../plugin";
import { MusicPlayer } from "../player";

export class QueueCommand implements Command {
  public name = "queue";
  public patterns = ["q", "queue"];
  public execute({ msg }: CommandOpts) {
    const player = MusicPlayer.get(msg.guild.id);
    const songList = player.queue.songList;
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
