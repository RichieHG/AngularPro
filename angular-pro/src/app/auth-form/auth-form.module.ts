import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AuthFormComponent } from './auth-form.component';
import { AuthMessageComponent } from './components/auth-message.component';
import { AuthRememberComponent } from './components/auth-remember.component';

@NgModule({
  declarations: [
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    AuthFormComponent,
    AuthRememberComponent
  ],
  providers: [],
})
export class AuthFormModule { }
