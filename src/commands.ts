import { Msg } from "./types";
import { scrapSongDataFromYT } from "./scraper";
import Queue from "./queue";
import ytdl from "ytdl-core";
import { VoiceConnection, TextChannel, DMChannel } from "discord.js";
import { Song } from "./song";

export const handleSong = async (msg: Msg, query: string) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
    return;
  }

  const connection = msg.guild.voice.connection;
  const { id, name } = await scrapSongDataFromYT(query);
  const song: Song = {
    name,
    id,
    addedBy: msg.member.id
  };

  if (Queue.isEmpty() && !Queue.isPlaying) {
    play({ connection, song, textChannel: msg.channel });
  } else {
    msg.channel.send(`Song ${song.name} added to queueueueueu`);
    Queue.addSong(song);
  }
};

const play = ({ connection, textChannel, song }: PlayOpts) => {
  Queue.isPlaying = true;
  const url = `https://www.youtube.com/watch?v=${song.id}`;
  textChannel.send(`Now playing: ${song.name}`);
  connection.play(ytdl(url)).on("finish", () => {
    Queue.isPlaying = false;
    console.log(`Song ${song.name} finished playing.`);
    if (!Queue.isEmpty) {
      Queue.isPlaying = true;
      const nextSong = Queue.getSong();
      play({ connection, textChannel, song: nextSong });
    }
  });
};

interface PlayOpts {
  connection: VoiceConnection;
  textChannel: TextChannel | DMChannel;
  song: Song;
}

export const handleJoin = (msg: Msg) => {
  const channel = msg.member.voice.channel;
  if (channel) {
    channel.join();
  } else {
    msg.channel.send("You must be in a voice channel first");
  }
};

export const handlePause = (msg: Msg) => {};
