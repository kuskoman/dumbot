import loader from "../../moduleLoader";
import { Command, DumbotModule } from "../../module";

export const findModules = (name: string): DumbotModule[] => {
  const modules = loader.modules;
  const matchingModules: DumbotModule[] = [];
  modules.forEach(m => {
    if (m.name.includes(name)) {
      matchingModules.push(m);
    }
  });
  return matchingModules;
};

export const findCommands = (name: string): Command[] => {
  const commands = loader.commands;
  const matchingCommands: Command[] = [];
  commands.forEach(c => {
    // exact pattern match or partial name match
    if (c.name.includes(name) || c.patterns.includes(name)) {
      matchingCommands.push(c);
    }
  });

  return matchingCommands;
};
