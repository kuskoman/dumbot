import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";
import play from "./commands/play";
import queue from "./commands/queue";
import skip from "./commands/skip";
import join from "./commands/join";
import leave from "./commands/leave";
import clearQueue from "./commands/clearQueue";

export class MusicBotModule implements DumbotModule {
  public name = "DefaultModule";
  public description = "Module used for playing music from YouTube";
  public version = "1.0.0";
  public commands = [play, queue, clearQueue, skip, join, leave];

  constructor() {
    loader.registerModule(this);
  }
}

const musicBotModule = new MusicBotModule();
export default musicBotModule;
