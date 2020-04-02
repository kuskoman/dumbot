import { CommandOpts, Command } from "../../../module";
import { recogniseRadioStation } from "../plugins/radio";
import radio from "../plugins/radio/commands/radio";
import ytPlay from "../plugins/yt/commands/yt";

export class PlayCommand implements Command {
  public name = "play";
  public patterns = ["play", "p"];
  public async execute(opts: CommandOpts) {
    const { args } = opts;
    if (recogniseRadioStation(args)) {
      radio.execute(opts);
    } else {
      ytPlay.execute(opts);
    }
  }
}

const play = new PlayCommand();
export default play;
