import { Client as DiscordClient } from "discord.js";
import { handleMessage } from "./commandsHandler";
import logger from "./logger";
import config from "./config";

export const bot = new DiscordClient();

bot.on("ready", () => {
  logger.info(`Bot logged in as ${bot.user?.tag}`);
});

bot.on("message", (msg) => {
  if (msg.content.startsWith(config.prefix) && !msg.author.bot) {
    handleMessage(msg);
  }
});

export default bot;
