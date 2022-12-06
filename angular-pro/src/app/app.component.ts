import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, DoCheck, NgZone, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/models/auth-form.interface';
import { FoodStoreService } from './food-store/food-store.service';
import { File } from './interfaces';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { Store } from './store';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // changeDetection:ChangeDetectionStrategy.Default,
  template: `
    <!-- <div> -->
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

      <!-- <ul>
        <li *myFor="let item of items; let i = index;">
          {{ i }} Member: {{ item.name | json }}
        </li>
        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul>-->
      <!-- <div *ngFor="let file of mapped">
        <p> {{file.name}}</p>
        <p> {{file.size}}</p>
      </div> -->
      <!-- <stock-inventory></stock-inventory> -->
    <!-- </div> -->
    <!-- <div class="app">
      <header>
        <img src="assets/logo.svg">
      </header>
      <div class="app__content">
        <nav>
          <a
            [routerLink]="['/mail',{outlets: {primary: 'folder/inbox', pane: null}}]"
            routerLinkActive="active">
            Inbox
          </a>
          <a
            [routerLink]="['/mail',{outlets: {primary: 'folder/trash', pane: null}}]"
            routerLinkActive="active">
            Trash
          </a>
          <a
            [routerLink]="['/dashboard']"
            routerLinkActive="active">
            Dashboard
          </a>
        </nav>
        <router-outlet></router-outlet>
      </div>
    </div> -->
    <!-- <div>
      <pizza-viewer></pizza-viewer>
      <side-viewer></side-viewer>
      <drink-viewer></drink-viewer>
    </div> -->
    <!-- <div>
      Food Store ({{ (store | async)?.name }})
    </div> -->
    <!-- <div>
      Counter: {{counter}}
    </div> -->

    <div>
      <!-- <div *ngFor="let todo of todos$ | async">
        {{ todo.name }}
      </div> -->

      <songs-playlist></songs-playlist>
      <songs-listened></songs-listened>
      <songs-favourites></songs-favourites>

    </div>
  `,
  // styleUrls: ['./app.component.scss'],
  // styles: [`
  //   /* pizza-viewer,
  //   side-viewer,
  //   drink-viewer {
  //     display: block;
  //     border-bottom: 2px solid #eee;
  //     padding: 20px 0;
  //   } */
  // `],
  providers: [
    // FileSizePipe
  ]
})
export class AppComponent {

  todos$ = this.store.select<any[]>('todos');

  constructor(
    private store: Store
  ) {
    this.store.set('todos', [{ id: 1, name: 'Eat dinner' }, { id: 2, name: 'Do washing' }]);
    console.log(this.store)
  }


  // counter: number = 0;
  // // store = this.foodService.getStore();
  // constructor(
  //   private zone: NgZone
  // ){

  // }
  // ngOnInit(){
  //   this.zone.runOutsideAngular(() => {
  //      setTimeout(() => this.counter++, 1000);

  //   });
  //   this.zone.run(() => {
  //     setTimeout(() => this.counter = this.counter, 2000);
  //   })

  // }
  // ngDoCheck() {
  //     console.log('Change detection has been run!')
  // }

  // constructor(
  //   private router: Router
  // ){

  // }
  // ngOnInit() {
  //     // this.router.events
  //     // .pipe(
  //     //   filter((event: any) => event instanceof NavigationEnd)
  //     // )
  //     // .subscribe((event: any) => {
  //     //   console.log(event);
  //     // })
  // }
  //implements AfterViewInit, OnInit{

  // rememberMe: boolean = false;

  // @ViewChild('entry', {read: ViewContainerRef})
  // entry? : ViewContainerRef;

  // @ViewChild('tmpl')
  // tmpl? : TemplateRef<any>;
  // component?: ComponentRef<AuthFormComponent>;

  // user: any = {
  //   name: 'Mark Hoppus',
  //   age: 44,
  //   location: 'California'
  // };

  // files : File[] = []
  // mapped : File[] = []
  // ctx = {
  //   location: 'CDMX, MX',
  //   $implicit: 'Richie HG'
  // }

  // items = [{
  //   name: 'Mark Hoppus',
  //   age: 44,
  //   location: 'California'
  // },{
  //   name: 'Tom Delonge',
  //   age: 41,
  //   location: 'California'
  // },{
  //   name: 'Travis Barker',
  //   age: 41,
  //   location: 'California'
  // }];
  // constructor(
  //   private cd: ChangeDetectorRef,
  //   private fileSizePipe: FileSizePipe
  // ){
  //     setTimeout(() => {
  //         this.items = [...this.items,{
  //           age:25,
  //           location: 'CDMX',
  //           name: 'Neftali'
  //         }]
  //     }, 2000);
  // }

  // ngOnInit(): void {
  //     this.files = [
  //       {
  //         name: 'logo.svg',
  //         size: 2120109,
  //         type: 'image/svg'
  //       },
  //       {
  //         name: 'banner.jpg',
  //         size: 18029,
  //         type: 'image/jpg'
  //       },
  //       {
  //         name: 'background.png',
  //         size: 1784562,
  //         type: 'image/png'
  //       }
  //     ];

  //     this.mapped = this.files.map(file => {
  //       return {
  //         name: file.name,
  //         type: file.type,
  //         size: this.fileSizePipe.transform(file.size, 'mb')
  //       }
  //     })
  // }

  // ngAfterViewInit() {
  //   if(this.entry && this.tmpl){
  //     // this.entry?.createComponent(AuthFormComponent);
  //     // this.component = this.entry?.createComponent(AuthFormComponent,{index:0});
  //     // this.component.instance.title = 'Create Account';
  //     // this.component.instance.submitted.subscribe(this.loginUser);

  //     this.entry.createEmbeddedView(this.tmpl,{
  //       location: 'CDMX, MX',
  //       $implicit: 'Richie HG'
  //     });
  //   }
  //   this.cd.detectChanges();
  // }
  // createUser(user: User){
  //   console.log('Create account', user);
  // }

  // loginUser(user: User){
  //   console.log('Login', user);
  //   console.log('Remember me', this.rememberMe);
  // }

  // rememberUser(value: boolean){
  //   this.rememberMe = value;
  // }
  // destroyComponent(){
  //   this.component?.destroy();
  // }

  // moveComponent(){
  //   if(this.component){
  //     this.entry?.move(this.component.hostView, 1);
  //   }

  // }

  // addProp() {
  //   this.user.email = 'blink@blink-182.net';
  // }

  // changeName() {
  //   this.user.name = 'Travis Barker';
  // }

  // changeUser() {
  //   this.user = {
  //     name: 'Tom Delonge',
  //     age: 41,
  //     location: 'California'
  //   };
  // }

}
