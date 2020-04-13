import { CommandOpts, Command } from "../../../../../module";
import { SoundPlayer } from "../../../player";
import { getRadio } from "../index";
import { listStations } from "../listStations";

export class RadioCommand implements Command {
  public name = "radio";
  public patterns = ["radio"];
  public execute({ msg, args }: CommandOpts): any {
    if (!args) {
      return msg.channel.send(listStations());
    }
    if (!msg.guild?.id) {
      return msg.channel.send("Can't find server id.");
    }
    const player = SoundPlayer.get(msg.guild.id);
    const song = getRadio(msg, args);
    if (!song) {
      return msg.channel.send(`No station found for identifier ${args}`);
    }
    player.play({ msg, song, opts: { mode: "radio" } });
  }
}

const radio = new RadioCommand();
export default radio;
