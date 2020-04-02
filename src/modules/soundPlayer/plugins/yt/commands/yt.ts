import { CommandOpts, Command } from "../../../../../module";
import { SoundPlayer } from "../../../player";
import { getSongFromYouTube } from "..";

export class PlayYTCommand implements Command {
  public name = "playYT";
  public patterns = ["playyt", "yt"];
  public async execute({ msg, args }: CommandOpts) {
    const song = await getSongFromYouTube(msg, args);
    const player = SoundPlayer.get(msg.guild.id);
    player.play({ msg, song });
  }
}

const playYT = new PlayYTCommand();
export default playYT;
