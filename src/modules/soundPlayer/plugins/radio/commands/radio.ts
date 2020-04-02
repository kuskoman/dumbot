import { CommandOpts, Command } from "../../../../../module";
import { SoundPlayer } from "../../../player";
import { getRadio } from "../index";

export class RadioCommand implements Command {
  public name = "radio";
  public patterns = ["radio"];
  public execute({ msg, args }: CommandOpts) {
    const player = SoundPlayer.get(msg.guild.id);
    const song = getRadio(msg, args);
    player.play({ msg, song });
  }
}

const radio = new RadioCommand();
export default radio;
