import { CommandOpts, Command } from "../../../plugin";
import { joinChannel } from "../utils";

export class JoinCommand implements Command {
  public name = "join";
  public patterns = ["join", "j"];
  public execute({ msg }: CommandOpts) {
    joinChannel(msg);
  }
}

const join = new JoinCommand();
export default join;
