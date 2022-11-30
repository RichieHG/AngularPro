import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-view',
  styleUrls:['mail-view.component.scss'],
  template:`
  <div class="mail-view">
      <h2>{{ (message | async)?.from }}</h2>
      <p>{{ (message | async)?.full }}</p>
    </div>
    <div class="mail-reply">
      <textarea
        (change)="updateReply($any($event.target).value)"
        placeholder="Type your reply..."
        [value]="reply">
      </textarea>
      <button type="button" (click)="sendReply()">
        Send
      </button>
    </div>
  `
})

export class MailViewComponent implements OnInit{

  reply: string = '';
  hasUnsavedChanges: boolean = false;
  message: Observable<Mail> = this.route.data.pipe( map((data: any) => data?.message))



  constructor(
    private route: ActivatedRoute
  ){

  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.reply = '';
      this.hasUnsavedChanges = false;
    });
  }

  updateReply(value: string) {
    this.reply = value;
    this.hasUnsavedChanges = true;
  }

  sendReply() {
    console.log('Sent!', this.reply);
    this.reply = '';
    this.hasUnsavedChanges = false;
  }
}
