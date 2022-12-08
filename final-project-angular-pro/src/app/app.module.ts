import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AuthModule } from 'src/auth/auth.module';
import { Store } from 'src/store';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppComponent } from './containers/app/app.component';

export const ROUTES: Route[] = [];
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
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




