import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AuthModule } from 'src/auth/auth.module';
import { HealthModule } from 'src/health/health.module';
import { Store } from 'src/store';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppComponent } from './containers/app/app.component';

export const ROUTES: Route[] = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'schedule'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule

  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




