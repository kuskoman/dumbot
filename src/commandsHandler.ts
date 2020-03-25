import { Msg } from "./types";
import join from "./commands/join";
import play from "./commands/play";
import ping from "./commands/ping";
import sei from "./commands/sei";
import { PREFIX } from "./index";

const commands = [join, play, ping, sei];

export const handleMessage = (msg: Msg) => {
  const command = extractCommand(msg);
  const args = extractArgs(msg);

  commands.forEach(c => {
    if (c.pattern.includes(command)) {
      c.execute({ msg, command, args });
    }
  });
};

const extractCommand = (msg: Msg) => {
  return msg.content.slice(PREFIX.length).split(" ")[0];
};

const extractArgs = (msg: Msg) => {
  return msg.content
    .slice(PREFIX.length)
    .split(" ")
    .slice(1)
    .join(" ");
};
