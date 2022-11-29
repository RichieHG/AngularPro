import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-view',
  styleUrls:['mail-view.component.scss'],
  template:`
  <div class="mail-view">
    <h2>{{(message | async)?.from }}</h2>
    <p>{{(message | async)?.full }}</p>
  </div>
  `
})

export class MailViewComponent {

  message: Observable<Mail> = this.route.data.pipe( map((data: any) => data?.message))

  constructor(
    private route: ActivatedRoute
  ){

  }
}
