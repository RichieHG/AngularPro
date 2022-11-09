import { Component, EventEmitter, Output } from "@angular/core";
import { User } from "./models/auth-form.interface";

@Component({
  selector: 'auth-form',
  templateUrl: 'auth-form.component.html'
})

export class AuthFormComponent{

  @Output()
  submitted: EventEmitter<User> = new EventEmitter();
  constructor() {}

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
