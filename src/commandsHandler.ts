import { Msg } from "./types";
import { PREFIX } from "./index";
import loader from "./pluginLoader";

export const handleMessage = async (msg: Msg) => {
  const command = extractCommand(msg);
  const args = extractArgs(msg);

  const commands = loader.commands;
  commands.forEach(c => {
    if (c.patterns.includes(command)) {
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
