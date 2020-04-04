import { MusicQueue } from "./queue";
import { StreamDispatcher, VoiceConnection } from "discord.js";
import { Msg, MsgChannel } from "../../types";
import { Song } from "./song";
import { joinChannel } from "./utils";

export class SoundPlayer {
  public static PLAYERS: SoundPlayer[] = [];
  public serverId: string;
  public queue: MusicQueue;
  public isPlaying: boolean;
  public dispatcher: StreamDispatcher | undefined;
  public voiceConnection: VoiceConnection | undefined;
  public playMode: PlayMode;

  public static get(serverId: string): SoundPlayer {
    let player: SoundPlayer | undefined = this.PLAYERS.find((player) => {
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
    this.playMode = "queue";
  }

  public async play({ msg, song, opts }: PlayInput) {
    opts = opts || {};
    const { mode } = opts;
    const textChannel = msg.channel;
    const connection = await this.getVoiceConnection(msg);
    if (!connection) return;

    if (mode === "radio") {
      this.dispatcher.end();
      msg.channel.send(`Playing radio **${song.name}**.`);
      return this.streamSong({ textChannel, connection, song, mode });
    }

    if (!this.queue.isEmpty || this.isPlaying) {
      msg.channel.send(`**${song.name}** added to queue`);
      return this.queue.addSong(song);
    }

    msg.channel.send(`Now playing ${song.name}`);
    this.streamSong({ textChannel, connection, song, mode });
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
  }

  private async streamSong({ connection, textChannel, song }: StreamSongOpts) {
    if (this.queue.currentSong) {
      this.queue.lastSong = this.queue.currentSong;
    }
    this.queue.currentSong = song;
    this.isPlaying = true;
    this.voiceConnection = connection;

    this.dispatcher = connection
      .play(song.getStream(), song.options)
      .on("finish", () => {
        this.queue.currentSong = undefined;

        this.playQueueIfPossible({ connection, textChannel });
      });
  }

  private async getVoiceConnection(
    msg: Msg
  ): Promise<VoiceConnection | undefined> {
    let connection = msg.guild?.voice?.connection;
    if (!connection) {
      const voiceChannel = await joinChannel(msg);
      if (!voiceChannel) {
        return undefined;
      }
      connection = msg.guild?.voice?.connection;
    }
    return connection;
  }

  private async playQueueIfPossible({
    connection,
    textChannel,
  }: PlayQueueIfPossibleInput) {
    if (this.queue.isEmpty()) {
      return (this.isPlaying = false);
    }

    const nextSong = this.queue.getSong();
    return this.streamSong({
      connection,
      textChannel,
      song: nextSong,
      mode: "queue",
    });
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

export type PlayMode = "queue" | "radio";

interface StreamSongOpts {
  song: Song;
  textChannel: MsgChannel;
  connection: VoiceConnection;
  mode: PlayMode;
}

interface PlayQueueIfPossibleInput {
  connection: VoiceConnection;
  textChannel: MsgChannel;
}
