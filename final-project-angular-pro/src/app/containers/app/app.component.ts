import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <h1>{{user$ | async | json}}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{

  user$?: Observable<User>;
  subscription?: Subscription;
  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ =this.store.select('user');
  }

  ngOnDestroy() {
      this.subscription?.unsubscribe();
  }
}

