import { MusicQueue } from "./queue";
import { StreamDispatcher, VoiceConnection } from "discord.js";
import { Msg, MsgChannel } from "../../types";
import { Song } from "./song";
import { joinChannel } from "./utils";
import logger from "../../logger";

export class SoundPlayer {
  public static PLAYERS: SoundPlayer[] = [];
  public serverId: string;
  public queue: MusicQueue;
  public isPlaying: boolean;
  public dispatcher: StreamDispatcher | undefined;
  public voiceConnection: VoiceConnection | undefined;

  public static get(serverId: string): SoundPlayer {
    let player: SoundPlayer | undefined = this.PLAYERS.find((player) => {
      return player.serverId === serverId;
    });

    if (!player) {
      player = new SoundPlayer(serverId);
      this.PLAYERS.push(player);
    }

    return player;
  }

  constructor(serverId: string) {
    this.serverId = serverId;
    this.queue = new MusicQueue();
    this.isPlaying = false;
  }

  public async play({ msg, song }: PlayInput) {
    const textChannel = msg.channel;
    const connection = await this.getVoiceConnection(msg);
    if (!connection) return;

    if (!this.queue.isEmpty || this.isPlaying) {
      msg.channel.send(`**${song.name}** added to queue`);
      logger.info(
        `${msg.member?.id} added ${song.name} to queue on channel ${connection.channel.id}`
      );
      return this.queue.addSong(song);
    }

    msg.channel.send(`Now playing **${song.name}**`);
    return this.streamSong({ textChannel, connection, song });
  }

  public async skip(msg: Msg): Promise<any> {
    if (!msg.member?.voice?.channel) {
      return msg.channel.send("You are not connected to a voice channel");
    }
    if (!this.isPlaying) {
      return msg.channel.send("There is nothing to skip");
    }

    msg.channel.send("Skipping current song");
    this.endDispatcher();
  }

  private streamSong({ connection, textChannel, song }: StreamSongOpts) {
    this.queue.currentSong = song;
    this.isPlaying = true;
    this.voiceConnection = connection;

    this.dispatcher = connection
      .play(song.getStream(), song.options)
      .on("start", () => {
        logger.info(`Bot playing ${song.name} on ${connection.channel.id}.`);
      })
      .on("finish", () => {
        this.queue.lastSong = this.queue.currentSong;
        this.queue.currentSong = undefined;

        this.queue.currentSong = undefined;

        if (!this.queue.isEmpty()) {
          const nextSong = this.queue.getSong();
          if (nextSong) {
            return this.streamSong({ connection, textChannel, song: nextSong });
          }
        }
        this.isPlaying = false;
      });
  }

  private async getVoiceConnection(
    msg: Msg
  ): Promise<VoiceConnection | undefined | null> {
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

  private endDispatcher() {
    if (this.dispatcher) {
      this.dispatcher.end();
    }
  }
}

export interface PlayInput {
  msg: Msg;
  song: Song;
  opts?: PlayOptsInput;
}

export interface PlayOptsInput {
  mode?: PlayMode;
}

export type PlayMode = "queue" | "radio";

interface StreamSongOpts {
  song: Song;
  textChannel: MsgChannel;
  connection: VoiceConnection;
}
