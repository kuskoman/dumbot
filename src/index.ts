import "dotenv/config";
import { Client as DiscordClient } from "discord.js";

const client = new DiscordClient();
client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
