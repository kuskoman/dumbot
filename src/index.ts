import "dotenv/config";
import "./modules";
import { Client as DiscordClient } from "discord.js";
import { handleMessage } from "./commandsHandler";
import logger from "./logger";
import { PREFIX } from "./config";

export const client = new DiscordClient();

client.on("ready", () => {
  logger.info(`Bot logged in as ${client.user?.tag}`);
});

client.on("message", (msg) => {
  if (msg.content.startsWith(PREFIX) && !msg.author.bot) {
    handleMessage(msg);
  }
});

client.login(process.env.DISCORD_TOKEN);
