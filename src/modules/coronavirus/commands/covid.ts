import { CommandOpts, Command } from "../../../module";
import api from "../api";
import { findCountry } from "../findCountry";
import { formatCountryData } from "../templates";

export class CovidCommand implements Command {
  public name = "covid";
  public patterns = ["covid", "cov", "cov19", "coronavirus", "koronawirus"];
  public async execute({ msg, args }: CommandOpts): Promise<any> {
    const query = args.trim().toLowerCase();
    const data = await api.getSummary();
    const countryData = findCountry(data, query);
    if (!countryData) {
      return msg.channel.send(
        `Can't find coronavirus data for query: ${query}`
      );
    }
    const formattedData = formatCountryData(countryData);
    msg.channel.send(formattedData);
  }
}

const covid = new CovidCommand();
export default covid;
