import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from 'src/app/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template:`
  <div class="songs">
  <songs-list [list]="(listened$ | async)!" (toggle)="onToggle($event)">
    Listened
  </songs-list>
</div>
  `
})

export class SongsListenedComponent implements OnInit  {
  listened$? : Observable<any[]>
  constructor(
    private store: Store,
    private songsService: SongsService
  ) { }

  ngOnInit() {
      this.listened$ = this.store.select('playlist')
      .pipe(
        filter(Boolean),
        map((playlist: any) => playlist.filter((track: any) => track.listened))
      );
  }

  onToggle(event: any){
    this.songsService.toggle(event);
  }

}
