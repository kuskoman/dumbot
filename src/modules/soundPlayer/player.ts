import { MusicQueue } from "./queue";
import {
  StreamDispatcher,
  VoiceConnection,
  TextChannel,
  DMChannel,
  NewsChannel
} from "discord.js";
import { Msg } from "../../types";
import { Song } from "./song";
import { joinChannel } from "./utils";

export class SoundPlayer {
  public static PLAYERS: SoundPlayer[] = [];
  public serverId: string;
  public queue: MusicQueue;
  public isPlaying: boolean;
  public dispatcher: StreamDispatcher;
  public voiceConnection: VoiceConnection;

  public static get(serverId: string): SoundPlayer {
    let player: SoundPlayer | undefined = this.PLAYERS.find(player => {
      return player.serverId === serverId;
    });

    if (!player) {
      player = new SoundPlayer(serverId);
    }

    this.PLAYERS.push(player);
    return player;
  }

  constructor(serverId: string) {
    this.serverId = serverId;
    this.queue = new MusicQueue();
    this.isPlaying = false;
  }

  public async play({ msg, song, opts }: PlayInput) {
    opts = opts || {};

    if (!msg.guild.voice.connection) {
      if (!(await joinChannel(msg))) {
        return;
      }
    }

    const textChannel = msg.channel;
    const connection = msg.guild.voice.connection;

    if (!this.queue.isEmpty || this.isPlaying) {
      msg.channel.send(`**${song.name}** added to queue`);
      this.queue.addSong(song);
    } else {
      msg.channel.send(`Now playing ${song.name}`);
      this.streamSong({ textChannel, connection, song });
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
        textChannel: msg.channel,
        connection: this.voiceConnection,
        song
      });
    }
  }

  private async streamSong({ connection, textChannel, song }: StreamSongOpts) {
    if (this.queue.currentSong) {
      this.queue.lastSong = this.queue.currentSong;
    }
    this.queue.currentSong = song;
    this.isPlaying = true;
    this.voiceConnection = connection;

    this.dispatcher = connection
      .play(song.uri, song.options)
      .on("finish", () => {
        this.queue.currentSong = undefined;

        if (!this.queue.isEmpty()) {
          const nextSong = this.queue.getSong();
          this.streamSong({ connection, textChannel, song: nextSong });
        } else {
          this.isPlaying = false;
        }
      })
      .on("error", errInfo => {
        console.log(`Unexpected error while playing: ${errInfo}`);
      }); // todo: handle bot disconnect
  }
}

export interface PlayInput {
  msg: Msg;
  song: Song;
  opts?: PlayOpts;
}

export interface PlayOpts {
  mode?: PlayMode;
}

export type PlayMode = "queue" | "instant";

interface StreamSongOpts {
  song: Song;
  textChannel: TextChannel | DMChannel | NewsChannel;
  connection: VoiceConnection;
}
