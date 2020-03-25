import "dotenv/config";
import { Client as DiscordClient, PartialMessage, Message } from "discord.js";

const client = new DiscordClient();
const prefix = "?";
client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

const handleSong = () => {
  console.log("dupa");
};

const handleJoin = (msg: Message | PartialMessage) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};

const handleMessage = (msg: Message | PartialMessage) => {
  const content = msg.content.slice(prefix.length);
  const reply = (text: string) => {
    msg.channel.send(text);
  };

  if (content.startsWith("p") || content.startsWith("play")) {
    handleSong();
  } else if (content === "j" || content === "join") {
    handleJoin(msg);
  } else if (content === "dziaduu") {
    reply("ile zarabiasz");
  }
};

client.on("message", msg => {
  if (msg.content.startsWith(prefix)) {
    handleMessage(msg);
  }
});

client.login(process.env.DISCORD_TOKEN);
