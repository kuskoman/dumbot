import { Msg } from "./types";
import { PREFIX } from "./index";
import loader from "./moduleLoader";
import logger from "./logger";

export const handleMessage = async (msg: Msg) => {
  const command = extractCommand(msg).toLowerCase();
  const args = extractArgs(msg);

  const commands = loader.commands;
  commands.forEach((c) => {
    if (c.patterns.includes(command)) {
      logger.debug(
        `Message ${msg.content} recognised as command. Executing using ${c.name}`
      );
      return c.execute({ msg, command, args });
    }
  });
};

const extractCommand = (msg: Msg) => {
  return msg.content.slice(PREFIX.length).split(" ")[0];
};

const extractArgs = (msg: Msg) => {
  return msg.content.slice(PREFIX.length).split(" ").slice(1).join(" ");
};
