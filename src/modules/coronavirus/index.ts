import { DumbotModule } from "../../module";
import loader from "../../moduleLoader";

export class CovidApiModule implements DumbotModule {
  public name = "Covid API Client";
  public description = "Provides stats of coronavirus cases";
  public version = "1.0.0";
  public commands = [];

  constructor() {
    loader.registerModule(this);
  }
}

const covidApi = new CovidApiModule();
export default covidApi;
