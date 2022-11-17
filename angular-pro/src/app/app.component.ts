import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/models/auth-form.interface';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  changeDetection:ChangeDetectionStrategy.Default,
  template: `
    <div>
      <button (click)="addProp()">Add property</button>
      <button (click)="changeUser()">Change user object</button>
      <button (click)="changeName()">Change name property</button>
      <div class="users">
        <example-one [user]="user"></example-one>
        <example-two [user]="user"></example-two>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  rememberMe: boolean = false;

  @ViewChild('entry', {read: ViewContainerRef})
  entry? : ViewContainerRef;

  @ViewChild('tmpl')
  tmpl? : TemplateRef<any>;
  component?: ComponentRef<AuthFormComponent>;

  user: any = {
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  };

  ctx = {
    location: 'CDMX, MX',
    $implicit: 'Richie HG'
  }
  constructor(
    private cd: ChangeDetectorRef
  ){

  }

  ngAfterViewInit() {
    if(this.entry && this.tmpl){
      // this.entry?.createComponent(AuthFormComponent);
      // this.component = this.entry?.createComponent(AuthFormComponent,{index:0});
      // this.component.instance.title = 'Create Account';
      // this.component.instance.submitted.subscribe(this.loginUser);

      this.entry.createEmbeddedView(this.tmpl,{
        location: 'CDMX, MX',
        $implicit: 'Richie HG'
      });
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

  addProp() {
    this.user.email = 'blink@blink-182.net';
  }

  changeName() {
    this.user.name = 'Travis Barker';
  }

  changeUser() {
    this.user = {
      name: 'Tom Delonge',
      age: 41,
      location: 'California'
    };
  }
}
