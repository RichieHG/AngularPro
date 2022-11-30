import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
