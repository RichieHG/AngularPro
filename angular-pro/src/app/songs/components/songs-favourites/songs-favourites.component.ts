import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from 'src/app/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-favourites',
  template: `
  <div class="songs">
  <songs-list [list]="(favourites$ | async)!" (toggle)="onToggle($event)">
    Favourites
  </songs-list>
</div>
  `
})

export class SongsFavouritesComponent implements OnInit{
  favourites$? : Observable<any[]>;
  constructor(
    private store: Store,
    private songsService: SongsService
  ) { }

  ngOnInit() {
      this.favourites$ = this.store.select('playlist')
      .pipe(
        filter(Boolean),
        map((playlist: any) => playlist.filter((track: any) => track.favourite))
      );
  }

  onToggle(event: any){
    this.songsService.toggle(event);
  }
}
