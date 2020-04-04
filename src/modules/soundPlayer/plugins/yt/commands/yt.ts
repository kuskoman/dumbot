import { CommandOpts, Command } from "../../../../../module";
import { SoundPlayer } from "../../../player";
import { getSongFromYouTube } from "..";

export class PlayYTCommand implements Command {
  public name = "playYT";
  public patterns = ["playyt", "yt"];
  public async execute({ msg, args }: CommandOpts): Promise<any> {
    const song = await getSongFromYouTube(msg, args);
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    if (!song) {
      return msg.channel.send(`Error when fetching song ${args}`);
    }

    player.play({ msg, song });
  }
}

const playYT = new PlayYTCommand();
export default playYT;
