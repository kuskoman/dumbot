import { DumbotPlugin, Command } from "./plugin";

export class PluginLoader {
  public plugins: DumbotPlugin[] = [];
  public commands: Command[] = [];

  public registerPlugin(plugin: DumbotPlugin) {
    this.plugins.push(plugin);
    this.commands.push(...plugin.commands);
  }
}

const pluginLoader = new PluginLoader();
export default pluginLoader;
