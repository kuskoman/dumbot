import "dotenv/config";
import "./modules";
import bot from "./bot";

bot.login(process.env.DISCORD_TOKEN);
