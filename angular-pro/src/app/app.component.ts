import { Component } from '@angular/core';
import { User } from './auth-form/models/auth-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rememberMe: boolean = false;
  createUser(user: User){
    console.log('Create account', user);
  }

  loginUser(user: User){
    console.log('Login', user);
    console.log('Remember me', this.rememberMe);
  }

  rememberUser(value: boolean){
    this.rememberMe = value;
  }
}
