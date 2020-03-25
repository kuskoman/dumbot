export type YouTubeID = string;
export type DiscordID = string;

export interface Song {
  name: string;
  id: YouTubeID;
  addedBy: DiscordID;
}
