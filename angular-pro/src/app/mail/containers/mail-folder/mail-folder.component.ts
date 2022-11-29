import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{title | async}}</h2>
    <mail-item
      *ngFor="let message of (messages | async)"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent {
  // messages: Mail[] = [{
  //   "id": 1,
  //   "folder": "inbox",
  //   "from": "Jane Smith",
  //   "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, neque at ultricies fringilla, ligula metus",
  //   "timestamp": 1487848162905
  // }];

  messages?: Observable<Mail[]> = this.route.data.pipe(
    map((data:any) => data?.messages)
  );

  title?: Observable<string> = this.route.params.pipe(
    map((params:any) => params?.name),
  );
  constructor(
    private route: ActivatedRoute
  ){
  }
}
