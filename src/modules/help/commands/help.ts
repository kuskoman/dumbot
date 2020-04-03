import { CommandOpts, Command } from "../../../module";

export class HelpCommand implements Command {
  public name = "help";
  public patterns = ["help", "h"];
  public execute({ msg }: CommandOpts) {}
}

const help = new HelpCommand();
export default help;
