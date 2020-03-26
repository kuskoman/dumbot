import { Msg } from "src/types";
import { getSongData } from "./yt";
import { joinChannel } from "./utils";
import {
  TextChannel,
  DMChannel,
  VoiceConnection,
  StreamDispatcher,
  VoiceChannel
} from "discord.js";
import { Song } from "./song";
import ytdl from "ytdl-core";
import { MusicQueue } from "./queue";

export class MusicPlayer {
  public static PLAYERS: MusicPlayer[] = [];
  public serverId: string;
  public queue: MusicQueue;
  public isPlaying: boolean;
  public dispatcher: StreamDispatcher;
  public voiceConnection: VoiceConnection;

  public static get(serverId: string): MusicPlayer {
    let player: MusicPlayer | undefined = this.PLAYERS.find(player => {
      return player.serverId === serverId;
    });

    if (!player) {
      player = new MusicPlayer(serverId);
    }

    this.PLAYERS.push(player);
    return player;
  }

  constructor(serverId: string) {
    this.serverId = serverId;
    this.queue = new MusicQueue();
    this.isPlaying = false;
  }

  public async play(msg: Msg) {
    const query = msg.content
      .split(" ")
      .slice(1)
      .join(" ");
    joinChannel(msg);
    const song = await getSongData(msg, query);
    const textChannel = msg.channel;
    const connection = msg.guild.voice.connection;

    if (this.queue.isEmpty() && !this.isPlaying) {
      msg.channel.send(`Now playing ${song.name}`);
      this.streamSong({ song, textChannel, connection });
    } else {
      msg.channel.send(`Song ${song.name} added to queue`);
      console.log(`Song ${song.name} added to queue`);
      this.queue.addSong(song);
    }
  }

  public async skip(msg: Msg): Promise<any> {
    if (!msg.member.voice.channel) {
      return msg.channel.send("You are not connected to a voice channel");
    }
    if (!this.isPlaying) {
      return msg.channel.send("There is nothing to skip");
    }
    msg.channel.send("Skipping current song");
    this.dispatcher.end();
    if (!this.queue.isEmpty()) {
      const song = this.queue.getSong();
      this.streamSong({
        song,
        textChannel: msg.channel,
        connection: this.voiceConnection
      });
    }
  }

  private async streamSong({ song, connection, textChannel }: StreamSongOpts) {
    this.isPlaying = true;
    this.voiceConnection = connection;

    console.log(`Started playing ${song.name}`);
    this.dispatcher = connection.play(ytdl(song.link)).on("finish", () => {
      if (!this.queue.isEmpty()) {
        const nextSong = this.queue.getSong();
        this.streamSong({ song: nextSong, connection, textChannel });
      } else {
        this.isPlaying = false;
      }
    });
  }
}

interface StreamSongOpts {
  textChannel: TextChannel | DMChannel;
  connection: VoiceConnection;
  song: Song;
}
