import { Command, DumbotModule } from "../../../module";

export const formatCommandsDescription = (commands: Command[]): string => {
  if (commands.length < 1) {
    return "No commands found";
  }

  let formattedString = "Commands found:\n";
  commands.forEach(c => {
    formattedString += `${c.name}:
      aliases: ${c.patterns.join(", ")},
      description: ${c.description ||
        "missing documentation for this command"}\n`;
  });

  return formattedString;
};

export const formatModulesDescription = (modules: DumbotModule[]): string => {
  if (modules.length < 1) {
    return "No modules found";
  }

  let formattedString = "Modules found:\n";
  modules.forEach(m => {
    formattedString += `${m.name}:
      version: ${m.version},
      ${m.description || "missing documentation for this module"}\n`;
  });

  return formattedString;
};
