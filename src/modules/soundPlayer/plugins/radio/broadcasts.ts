import { client } from "../../../../index";
import { VoiceBroadcast, StreamDispatcher, VoiceConnection } from "discord.js";
import { Msg } from "src/types";

export class RadioBroadcast {
  public static BROADCASTS: RadioBroadcast[] = [];
  public url: string;
  public broadcast: VoiceBroadcast;
  public dispatcher: StreamDispatcher;
  public subscribers: string[] = [];

  public static get(url: string): RadioBroadcast {
    let broadcast: RadioBroadcast | undefined = this.BROADCASTS.find(player => {
      return player.url === url;
    });

    if (!broadcast) {
      broadcast = new RadioBroadcast(url);
    }

    this.BROADCASTS.push(broadcast);
    return broadcast;
  }

  constructor(url: string) {
    this.url = url;
  }

  public join(subscriber: string): VoiceBroadcast {
    if (this.broadcast && this.dispatcher) {
      return this.broadcast;
    }

    if (!this.broadcast) {
      this.broadcast = client.voice.createBroadcast();
    }

    this.dispatcher = this.broadcast.play(this.url);
    this.subscribers.push(subscriber);

    return this.broadcast;
  }

  public unsubscribe(msg: Msg) {
    const subscriber = msg.guild.id;
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }

    this.removeBroadcastIfEmpty();
  }

  private removeBroadcastIfEmpty() {
    if (this.subscribers.length === 0) {
      this.dispatcher.end();
      // this.broadcast.end() https://github.com/discordjs/discord.js/issues/4014
      const index = RadioBroadcast.BROADCASTS.indexOf(this);
      if (index > -1) {
        RadioBroadcast.BROADCASTS.splice(index, 1);
      }
    }
  }
}
