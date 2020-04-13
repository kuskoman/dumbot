import "dotenv/config";
import "./modules";
import { Client as DiscordClient } from "discord.js";
import { handleMessage } from "./commandsHandler";

export const client = new DiscordClient();
export const PREFIX = process.env.PREFIX || "?";

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user?.tag}`);
});

client.on("message", (msg) => {
  if (msg.content.startsWith(PREFIX) && !msg.author.bot) {
    handleMessage(msg);
  }
});

client.login(process.env.DISCORD_TOKEN);
