import "dotenv/config";
import "./modules";
import bot from "./bot";
import logger from "./logger";
import config from "./config";

if (!process.env.DISCORD_TOKEN) {
  logger.error("Missing DISCORD_TOKEN environment variable");
}
if (!process.env.PREFIX) {
  logger.warn(
    `Missing PREFIX environemnt variable. Using default ${config.prefix} instead`
  );
}

if (!process.env.YT_API_KEY) {
  logger.warn(
    `Missing YT_API_KEY environemnt variable. Playing songs from YouTube will be disabled`
  );
}

bot.login(process.env.DISCORD_TOKEN);
