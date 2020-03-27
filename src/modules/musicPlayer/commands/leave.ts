import { CommandOpts, Command } from "../../../module";

export class LeaveCommand implements Command {
  public name = "leave";
  public patterns = ["leave", "l"];
  public execute({ msg }: CommandOpts) {
    msg.member.voice.channel.leave();
    // bot should detect 'close' event and end voice stream instantly
  }
}

const leave = new LeaveCommand();
export default leave;
