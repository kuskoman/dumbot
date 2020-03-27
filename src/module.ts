import { Msg } from "./types";

export interface DumbotModule {
  name: string;
  description: string;
  version: string;
  commands: Command[];
}

export interface Command {
  name: string;
  description?: string;
  patterns: string[];
  execute(opts: CommandOpts): any;
}

export interface CommandOpts {
  msg: Msg;
  args: string;
  command: string;
}
