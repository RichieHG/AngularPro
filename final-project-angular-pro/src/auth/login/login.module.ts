import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';

export const ROUTES: Route[] = [
  {
    path:'',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [],
})
export class LoginModule { }
