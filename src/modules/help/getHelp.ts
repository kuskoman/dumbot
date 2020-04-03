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

  if (commands.length) {
    message += `${formatCommandsDescription(commands)}\n`;
  }

  if (modules.length) {
    message += `${formatModulesDescription(modules)}\n`;
  }

  return message;
};

export const getModulesHelp = (name: string): string => {
  const modules = findModules(name);
  return formatModulesDescription(modules);
};

export const getCommandsHelp = (name: string): string => {
  const commands = findCommands(name);
  return formatCommandsDescription(commands);
};
