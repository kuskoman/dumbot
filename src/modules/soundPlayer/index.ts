import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";
import clearQueue from "./commands/clearQueue";
import current from "./commands/current";
import join from "./commands/join";
import leave from "./commands/leave";
import queue from "./commands/queue";
import skip from "./commands/skip";
import play from "./commands/play";

import playYT from "./plugins/yt/commands/yt";
import radio from "./plugins/radio/commands/radio";

export class SoundPlayerModule implements DumbotModule {
  public name = "DefaultModule";
  public description = "Module used for playing music from YouTube";
  public version = "1.0.0";
  public commands = [
    playYT,
    clearQueue,
    current,
    join,
    leave,
    queue,
    skip,
    radio,
    play
  ];

  constructor() {
    loader.registerModule(this);
  }
}

const musicBotModule = new SoundPlayerModule();
export default musicBotModule;
