import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";
import covid from "./commands/covid";

export class CovidApiModule implements DumbotModule {
  public name = "Covid API Client";
  public description = "Provides stats of coronavirus cases";
  public version = "1.0.0";
  public commands = [covid];

  constructor() {
    loader.registerModule(this);
  }
}

const covidApi = new CovidApiModule();
export default covidApi;
