import { Msg } from "./types";
import { play } from "./musicPlayer/play";
import { join } from "./musicPlayer/join";

export const handleMessage = (msg: Msg, content: string) => {
  const reply = (text: string) => {
    msg.channel.send(text);
  };

  if (content.startsWith("p") || content.startsWith("play")) {
    const query = content
      .split(" ")
      .slice(1)
      .join(" ");
    play(msg, query);
  } else if (content === "j" || content === "join") {
    join(msg);
  } else if (content === "l" || content === "leave") {
    msg.guild.voice.connection.disconnect();
  } else if (content === "dziaduu") {
    reply("ile zarabiasz");
  }
};
