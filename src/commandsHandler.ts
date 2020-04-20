import { Msg } from "./types";
import { PREFIX } from "./config";
import loader from "./moduleLoader";
import logger from "./logger";

export const handleMessage = async (msg: Msg) => {
  const commandPattern = extractCommand(msg)?.toLowerCase();
  const args = extractArgs(msg) || "";

  if (!commandPattern) {
    return;
  }

  const command = loader.getCommand(commandPattern);
  if (command) {
    logger.debug(
      `Message "${msg.content}" recognised as command. Executing using "${command.name}"`
    );
    command.execute({ msg, command: commandPattern, args });
  }
};

const extractCommand = (msg: Msg) => {
  return msg.content?.slice(PREFIX.length).split(" ")[0];
};

const extractArgs = (msg: Msg) => {
  return msg.content?.slice(PREFIX.length).split(" ").slice(1).join(" ");
};
