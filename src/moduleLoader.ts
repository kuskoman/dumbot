import { DumbotModule, Command } from "./module";
import logger from "./logger";

export class ModuleLoader {
  public modules: DumbotModule[] = [];
  public commandPatterns: Map<string, Command> = new Map();

  public registerModule(module: DumbotModule) {
    logger.debug(`Registering module ${module.name}`);
    this.modules.push(module);
    module.commands.forEach((command) => {
      command.patterns.forEach((pattern) => {
        this.commandPatterns.set(pattern, command);
      });
    });
  }

  public getCommand(command: string): Command | undefined {
    return this.commandPatterns.get(command);
  }
}

const moduleLoader = new ModuleLoader();
export default moduleLoader;
