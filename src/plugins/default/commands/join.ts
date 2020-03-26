import { CommandOpts, Command } from "../../../plugin";

export class JoinCommand implements Command {
  public name = "join";
  public patterns = ["join", "j"];
  public execute({ msg }: CommandOpts) {
    const channel = msg.member.voice.channel;
    if (channel) {
      channel.join();
    } else {
      msg.channel.send("You must be in a voice channel first");
    }
  }
}

const join = new JoinCommand();
export default join;
