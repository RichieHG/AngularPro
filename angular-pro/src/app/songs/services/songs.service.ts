import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Store } from "src/app/store";

const PLAYLIST_URL = 'http://localhost:3000/playlist';

export interface Song {
  id: number,
  artist: string,
  track: string,
  listened: boolean,
  favourite: boolean
}

@Injectable()
export class SongsService {

  getPlaylist$: Observable<Song[]> = this.http.get(PLAYLIST_URL)
    .pipe(
      map((response: any) => response),
      tap((value: any) => this.store.set('playlist', value))
    );


  toggle(event: any) {
    this.http.put(`${PLAYLIST_URL}/${event.track.id}`, event.track)
    .pipe(
      map((response: any) => response)
    )
    .subscribe((track: Song) => {
      const value = this.store.value.playlist;
      const playlist = value?.map((song: Song) =>{
        if(event.track.id == song.id){
          return {...song, ...event.track}
        }
        else
          return song
      })
      this.store.set('playlist',playlist);
    })
  }

  constructor(
    private http: HttpClient,
    private store: Store
  ) {

  }

}
