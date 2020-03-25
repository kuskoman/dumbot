import "dotenv/config";
import { Client as DiscordClient, PartialMessage, Message } from "discord.js";

const client = new DiscordClient();
const prefix = "?";
client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

const handleMessage = (msg: Message | PartialMessage) => {
  const content = msg.content.slice(prefix.length);
  const reply = (text: string) => {
    msg.channel.send(text);
  };

  if (content === "sei") {
    reply("cento");
  }
};

client.on("message", msg => {
  if (msg.content.startsWith(prefix)) {
    handleMessage(msg);
  }
});

client.login(process.env.DISCORD_TOKEN);
