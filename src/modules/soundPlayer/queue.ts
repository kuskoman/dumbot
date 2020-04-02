import { Song } from "./song";

export class MusicQueue {
  public songList: Song[] = [];
  public currentSong: Song;
  public lastSong: Song;

  public addSong(song: Song) {
    this.songList.push(song);
  }

  public getSong(): Song {
    const song = this.songList.shift();
    return song;
  }

  public removeSong(index: number) {
    this.songList.splice(index);
  }

  public isEmpty(): Boolean {
    return this.songList.length === 0;
  }

  public reset() {
    this.songList = [];
    this.currentSong = undefined;
  }
}