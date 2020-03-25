import { Song } from "./song";

export class MusicQueue {
  private songList: Song[] = [];

  public addSong(song: Song) {
    this.songList.push(song);
  }

  public getSong(): Song {
    return this.songList.shift();
  }

  public removeSong(index) {
    this.songList.splice(index);
  }
}
