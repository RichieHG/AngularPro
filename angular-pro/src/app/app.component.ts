import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/models/auth-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  rememberMe: boolean = false;

  @ViewChild('entry', {read: ViewContainerRef})
  entry? : ViewContainerRef;

  component?: ComponentRef<AuthFormComponent>;
  constructor(
    private cd: ChangeDetectorRef
  ){

  }

  ngAfterViewInit() {
    if(this.entry){
      this.entry?.createComponent(AuthFormComponent);
      this.component = this.entry?.createComponent(AuthFormComponent,{index:0});
      this.component.instance.title = 'Create Account';
      this.component.instance.submitted.subscribe(this.loginUser);
    }
    this.cd.detectChanges();
  }
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
  destroyComponent(){
    this.component?.destroy();
  }

  moveComponent(){
    if(this.component){
      this.entry?.move(this.component.hostView, 1);
    }

  }

}
