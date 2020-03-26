import { Msg } from "src/types";
import { getSongData } from "./yt";
import { joinChannel } from "./utils";
import { TextChannel, DMChannel, VoiceConnection } from "discord.js";
import { Song } from "./song";
import ytdl from "ytdl-core";
import Queue from "./queue";

export const play = async (msg: Msg) => {
  const query = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  joinChannel(msg);
  const song = await getSongData(msg, query);
  const textChannel = msg.channel;
  const connection = msg.guild.voice.connection;

  if (Queue.isEmpty() && !Queue.isPlaying) {
    msg.channel.send(`Now playing ${song.name}`);
    streamSong({ song, textChannel, connection });
  } else {
    msg.channel.send(`Song ${song.name} added to queue`);
    Queue.addSong(song);
  }
};

const streamSong = ({ song, connection, textChannel }: StreamSongOpts) => {
  Queue.isPlaying = true;

  connection.play(ytdl(song.link)).on("finish", () => {
    if (!Queue.isEmpty()) {
      const nextSong = Queue.getSong();
      streamSong({ song: nextSong, connection, textChannel });
    } else {
      Queue.isPlaying = false;
    }
  });
};

interface StreamSongOpts {
  textChannel: TextChannel | DMChannel;
  connection: VoiceConnection;
  song: Song;
}
