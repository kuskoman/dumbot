import { DumbotModule, Command } from "./module";

export class ModuleLoader {
  public modules: DumbotModule[] = [];
  public commands: Command[] = [];

  public registerModule(module: DumbotModule) {
    this.modules.push(module);
    this.commands.push(...module.commands);
  }
}

const moduleLoader = new ModuleLoader();
export default moduleLoader;
