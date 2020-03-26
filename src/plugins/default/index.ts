import { DumbotPlugin } from "../../plugin";
import ping from "./commands/ping";
import join from "./commands/join";
import sei from "./commands/sei";
import loader from "../../pluginLoader";

export class DefaultPlugin implements DumbotPlugin {
  public name = "DefaultPlugin";
  public description = "Plugin with default functions of bot";
  public author = "kkm <kubasurdej@gmail.com>";
  public version = "1.0.0";
  public commands = [ping, join, sei];

  constructor() {
    loader.registerPlugin(this);
  }
}

const defaultPlugin = new DefaultPlugin();
export default defaultPlugin;
