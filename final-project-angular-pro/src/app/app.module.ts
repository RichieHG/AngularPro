import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { Store } from 'src/store';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './containers/app/app.component';

export const ROUTES: Route[] = [];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule

  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




