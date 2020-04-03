import { findModules, findCommands } from "./finder";
import {
  formatModulesDescription,
  formatCommandsDescription
} from "./formatter";

export const getHelp = (name: string): string => {
  const modules = findModules(name);
  const commands = findCommands(name);

  let message = "";

  if (!modules.length && !commands.length) {
    return `No commands or modules found for ${name}.`;
  }

  if (modules.length) {
    message += `Modules found:
      ${formatModulesDescription(modules)}\n\n`;
  }

  if (commands.length) {
    message += `Commands found:
      ${formatCommandsDescription(commands)}`;
  }

  return message;
};
