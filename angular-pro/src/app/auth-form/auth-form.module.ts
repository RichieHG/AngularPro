import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthFormComponent } from './auth-form.component';
import { AuthRememberComponent } from './components/auth-remember.component';

@NgModule({
  declarations: [
    AuthFormComponent,
    AuthRememberComponent
  ],

  imports: [
    FormsModule
  ],
  exports: [
    AuthFormComponent,
    AuthRememberComponent
  ],
  providers: [],
})
export class AuthFormModule { }
