import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../services/songs.service';

@Component({
  selector: 'songs-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['songs-list.component.scss'],
  template: `
    <div class="songs-list">
      <h3>
        <ng-content></ng-content>
      </h3>
      <ul>
        <li *ngFor="let item of list; index as i;">
          <p>
            {{item.artist}}
          </p>
          <span>{{item.track}}</span>
          <div class="songs-list__favourite" [class.active]="item.favourite" (click)="toggleItem(i, 'favourite')"></div>
          <div class="songs-list__listened" [class.active]="item.listened" (click)="toggleItem(i, 'listened')"></div>

        </li>
      </ul>
    </div>
  `
})

export class SongsListComponent   {

  @Input()
  list?: Song[];

  @Output()
  toggle : EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  toggleItem(index: number, prop: string){
    const track = this.list![index] as any;
    this.toggle.emit({
      track: {...track, [prop]: !track[prop]}
    })

  }

}
