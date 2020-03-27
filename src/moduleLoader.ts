import { DumbotModule, Command } from "./module";

export class PluginLoader {
  public plugins: DumbotModule[] = [];
  public commands: Command[] = [];

  public registerModule(module: DumbotModule) {
    this.plugins.push(module);
    this.commands.push(...module.commands);
  }
}

const pluginLoader = new PluginLoader();
export default pluginLoader;
