import { Msg } from "./types";
import { scrapSongDataFromYT } from "./scraper";
import Queue from "./queue";
import ytdl from "ytdl-core";
import { TextChannel, DMChannel, VoiceConnection } from "discord.js";
import { Song } from "./song";

export const handleSong = async (msg: Msg, query: string) => {
  joinChannel(msg);
  const song = await getSongData(msg, query);
  const textChannel = msg.channel;
  const connection = msg.guild.voice.connection;

  if (Queue.isEmpty() && !Queue.isPlaying) {
    play({ song, textChannel, connection });
  } else {
    msg.channel.send(`Song ${song.name} added to queue`);
    Queue.addSong(song);
  }
};

const play = ({ song, connection, textChannel }: PlayOpts) => {
  Queue.isPlaying = true;
  textChannel.send(`Now playing: ${song.name}`);

  connection.play(ytdl(song.url)).on("finish", () => {
    Queue.isPlaying = false;
    if (!Queue.isEmpty()) {
      const nextSong = Queue.getSong();
      play({ song: nextSong, connection, textChannel });
    }
  });
};

interface PlayOpts {
  textChannel: TextChannel | DMChannel;
  connection: VoiceConnection;
  song: Song;
}

const joinChannel = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
    return;
  }
};

const getSongData = async (msg: Msg, query: string): Promise<Song> => {
  const { id, name } = await scrapSongDataFromYT(query);
  const song = {
    name,
    id,
    addedBy: msg.member.id,
    url: `https://www.youtube.com/watch?v=${id}`
  };
  return song;
};

export const handleJoin = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};

export const handlePause = (msg: Msg) => {};
