import { Msg } from "src/types";
import { joinChannel, getSongData } from "./utils";
import { TextChannel, DMChannel, VoiceConnection } from "discord.js";
import { Song } from "./song";
import ytdl from "ytdl-core";
import Queue from "./queue";

export const play = async (msg: Msg, query: string) => {
  joinChannel(msg);
  const song = await getSongData(msg, query);
  const textChannel = msg.channel;
  const connection = msg.guild.voice.connection;

  if (Queue.isEmpty() && !Queue.isPlaying) {
    streamSong({ song, textChannel, connection });
  } else {
    msg.channel.send(`Song ${song.name} added to queue`);
    Queue.addSong(song);
  }
};

const streamSong = ({ song, connection, textChannel }: StreamSongOpts) => {
  Queue.isPlaying = true;
  textChannel.send(`Now playing: ${song.name}`);

  connection.play(ytdl(song.url)).on("finish", () => {
    Queue.isPlaying = false;
    if (!Queue.isEmpty()) {
      const nextSong = Queue.getSong();
      streamSong({ song: nextSong, connection, textChannel });
    }
  });
};

interface StreamSongOpts {
  textChannel: TextChannel | DMChannel;
  connection: VoiceConnection;
  song: Song;
}
