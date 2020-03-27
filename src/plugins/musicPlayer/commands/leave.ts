import { CommandOpts, Command } from "../../../plugin";

export class LeaveCommand implements Command {
  public name = "leave";
  public patterns = ["leave", "l"];
  public execute({ msg }: CommandOpts) {
    msg.member.voice.channel.leave();
  }
}

const leave = new LeaveCommand();
export default leave;
