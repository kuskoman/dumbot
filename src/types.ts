import { Message, PartialMessage } from "discord.js";

export type Msg = Message | PartialMessage;

export interface Command {
  name: string;
  description?: string;
  pattern: string;
  execute(opts: CommandOpts): any;
}

export interface CommandOpts {
  msg: Msg;
  args: string;
  command: string;
}
