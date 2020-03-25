import { Song } from "./song";

export class MusicQueue {
  private songList: Song[] = [];
  public isPlaying: boolean;

  public addSong(song: Song) {
    this.songList.push(song);
  }

  public getSong(): Song {
    return this.songList.shift();
  }

  public removeSong(index) {
    this.songList.splice(index);
  }

  public isEmpty(): Boolean {
    return this.songList.length === 0;
  }
}

const queue = new MusicQueue();
export default queue;
