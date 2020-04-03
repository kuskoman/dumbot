import { CommandOpts, Command } from "../../../module";
import { getModulesHelp, getCommandsHelp, getHelp } from "../getHelp";

export class HelpCommand implements Command {
  public name = "help";
  public patterns = ["help", "h", "module", "command"];
  public execute({ msg, command, args }: CommandOpts) {
    const query = args.trim();
    switch (command) {
      case "module":
        msg.channel.send(getModulesHelp(query));
        break;
      case "command":
        msg.channel.send(getCommandsHelp(query));
        break;
      default:
        msg.channel.send(getHelp(query));
        break;
    }
  }
}

const help = new HelpCommand();
export default help;
