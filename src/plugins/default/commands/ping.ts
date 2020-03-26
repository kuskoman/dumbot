import { CommandOpts, Command } from "../../../plugin";

export class PingCommand implements Command {
  public name = "ping";
  public patterns = ["ping"];
  public execute({ msg }: CommandOpts) {
    msg.channel.send("pong");
  }
}

const ping = new PingCommand();
export default ping;
