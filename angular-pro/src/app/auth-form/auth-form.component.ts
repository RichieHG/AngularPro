import { Component, EventEmitter, Output, ContentChild, AfterContentInit, ContentChildren, QueryList, AfterViewInit, ViewChild, ViewChildren, ChangeDetectorRef, ElementRef } from "@angular/core";
import { User } from "./models/auth-form.interface";
import { AuthRememberComponent } from "./components/auth-remember.component";
import { AuthMessageComponent } from "./components/auth-message.component";
@Component({
  selector: 'auth-form',
  styles: [`
    .email{
      border-color: #9f72e6;
    }
  `],
  templateUrl: 'auth-form.component.html'
})

export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  showMessage: boolean = false;

  @ContentChild(AuthRememberComponent)
  remember?: AuthRememberComponent;

  @ViewChild(AuthMessageComponent)
  message?: AuthMessageComponent;

  @ViewChild('email')
  email?: ElementRef;

  // @ViewChildren(AuthMessageComponent)
  // message?: QueryList<AuthMessageComponent>;

  // @ContentChildren(AuthRememberComponent)
  // rememberChildren?: QueryList<AuthRememberComponent>;

  @Output()
  submitted: EventEmitter<User> = new EventEmitter();
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {

    if (this.remember) {
      this.remember.checked.subscribe((checked: boolean) => this.showMessage = checked);
      // this.rememberChildren.forEach((item: AuthRememberComponent) =>{
      //   item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      // });
    }
  }

  ngAfterViewInit() {
    if (this.message) {
      this.message.days = 20;
      // setTimeout(() => {
      //   this.message!.forEach((item: AuthMessageComponent) => item.days = 30)
      // });
    }
    this.email?.nativeElement.setAttribute('placeholder', 'Enter your email address');
    this.email?.nativeElement.classList.add('email');
    this.email?.nativeElement.focus();

    this.cd.detectChanges();
  }
  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
