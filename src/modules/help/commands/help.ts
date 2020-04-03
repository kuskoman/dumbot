import { CommandOpts, Command } from "../../../module";

export class HelpCommand implements Command {
  public name = "help";
  public patterns = ["help", "h", "module", "command"];
  public execute({ msg, command, args }: CommandOpts) {
    switch (command) {
      case "module":
        break;
      case "command":
        break;
      default:
        break;
    }
  }
}

const help = new HelpCommand();
export default help;
