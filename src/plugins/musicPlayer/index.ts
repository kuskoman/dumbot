import { DumbotPlugin } from "../../plugin";
import loader from "../../pluginLoader";
import play from "./commands/play";

export class MusucBotPlugin implements DumbotPlugin {
  public name = "DefaultPlugin";
  public description = "Plugin used for playing music from YouTube";
  public author = "kkm <kubasurdej@gmail.com>";
  public version = "1.0.0";
  public commands = [play];

  constructor() {
    loader.registerPlugin(this);
  }
}

const musicBotPlugin = new MusucBotPlugin();
export default musicBotPlugin;
