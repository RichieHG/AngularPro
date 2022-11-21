import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/models/auth-form.interface';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  changeDetection:ChangeDetectionStrategy.Default,
  template: `
    <div>
      <!-- <button (click)="addProp()">Add property</button>
      <button (click)="changeUser()">Change user object</button>
      <button (click)="changeName()">Change name property</button>
      <div class="users">
        <example-one [user]="user"></example-one>
        <example-two [user]="user"></example-two>
      </div> -->
      <!-- <label>
      Credit Card Number
      <input name="credit-card" type="text" placeholder="Enter yout 16-digit card number" credit-card>
      </label>
      <label tooltip="3 digits, back of your card" #myTooltip="tooltip">
        Enter your security code
        <span (mouseover)="myTooltip.show()" (mouseout)="myTooltip.hide()">(?)</span>
        <input type="text">
      </label> -->

      <ul>
        <li *myFor="let item of items; let i = index;">
          {{ i }} Member: {{ item.name | json }}
        </li>
        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul>
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

  items = [{
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  },{
    name: 'Tom Delonge',
    age: 41,
    location: 'California'
  },{
    name: 'Travis Barker',
    age: 41,
    location: 'California'
  }];
  constructor(
    private cd: ChangeDetectorRef
  ){
      setTimeout(() => {
          this.items = [...this.items,{
            age:25,
            location: 'CDMX',
            name: 'Neftali'
          }]
      }, 2000);
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
