import { Msg } from "./types";
import { handleSong, handleJoin, handlePause } from "./commands";

export const handleMessage = (msg: Msg, content: string) => {
  const reply = (text: string) => {
    msg.channel.send(text);
  };

  if (content.startsWith("p") || content.startsWith("play")) {
    const query = content
      .split(" ")
      .slice(1)
      .join(" ");
    handleSong(msg, query);
  } else if (content === "j" || content === "join") {
    handleJoin(msg);
  } else if (content === "l" || content === "leave") {
    msg.guild.voice.connection.disconnect();
  } else if (content === "pause") {
    handlePause(msg);
  } else if (content === "dziaduu") {
    reply("ile zarabiasz");
  }
};
