import { CommandOpts, Command } from "../../../../../module";
import { SoundPlayer } from "../../../player";
import { getSongFromYouTube } from "..";

export class PlayCommand implements Command {
  public name = "play";
  public patterns = ["play", "p"];
  public async execute({ msg, args }: CommandOpts) {
    const song = await getSongFromYouTube(msg, args);
    const player = SoundPlayer.get(msg.guild.id);
    player.play({ msg, song });
  }
}

const play = new PlayCommand();
export default play;
