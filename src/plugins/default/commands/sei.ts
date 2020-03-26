import { CommandOpts, Command } from "../../../plugin";

export class SeiCommand implements Command {
  public name = "ping";
  public patterns = ["sei"];
  public execute({ msg }: CommandOpts) {
    msg.channel.send("cento");
  }
}

const sei = new SeiCommand();
export default sei;
