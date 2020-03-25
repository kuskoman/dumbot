import { Msg } from "./types";
import { handleSong, handleJoin } from "./commands";
import { PREFIX } from "src";

export const handleMessage = (msg: Msg, content: string) => {
  const reply = (text: string) => {
    msg.channel.send(text);
  };

  if (content.startsWith("p") || content.startsWith("play")) {
    handleSong();
  } else if (content === "j" || content === "join") {
    handleJoin(msg);
  } else if (content === "l" || content === "leave") {
    msg.guild.voice.connection.disconnect();
  } else if (content === "dziaduu") {
    reply("ile zarabiasz");
  }
};
