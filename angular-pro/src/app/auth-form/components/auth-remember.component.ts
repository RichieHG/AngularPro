import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-remember',
  template: `
  <div>
    <label>
      <input type="checkbox" #rememberMe (change)="onChecked(rememberMe.checked)">
      Keep me logged in!
    </label>
  </div>
  `
})

export class AuthRememberComponent  {

  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  onChecked(value: any){
    this.checked.emit(value);
  }
}
