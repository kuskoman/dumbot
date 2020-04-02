import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";

export class SoundPlayerModule implements DumbotModule {
  public name = "DefaultModule";
  public description = "Module used for playing music from YouTube";
  public version = "1.0.0";
  public commands = [];

  constructor() {
    loader.registerModule(this);
  }
}

const musicBotModule = new SoundPlayerModule();
export default musicBotModule;
