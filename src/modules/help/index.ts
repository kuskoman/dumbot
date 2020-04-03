import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";
import help from "./commands/help";

export class HelpModule implements DumbotModule {
  public name = "HelpModule";
  public description = `Module providing help command sending instructions of commands usage`;
  public version = "1.0.0";
  public commands = [help];

  constructor() {
    loader.registerModule(this);
  }
}

const defaultModule = new HelpModule();
export default defaultModule;
