import { VoiceBroadcast, StreamOptions } from "discord.js";
import internal from "stream";

export type YouTubeID = string;
export type DiscordID = string;

export interface Song {
  name: string;
  id?: YouTubeID;
  addedBy: DiscordID;
  getStream: () => PlayableResource;
  options?: StreamOptions;
}

export type PlayableResource = string | VoiceBroadcast | internal.Readable;
