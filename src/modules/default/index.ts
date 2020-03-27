import { DumbotModule } from "../../module";
import ping from "./commands/ping";
import sei from "./commands/sei";
import loader from "../../moduleLoader";

export class DefaultModule implements DumbotModule {
  public name = "DefaultModule";
  public description = "Module with default functions of bot";
  public version = "1.0.0";
  public commands = [ping, sei];

  constructor() {
    loader.registerModule(this);
  }
}

const defaultModule = new DefaultModule();
export default defaultModule;
