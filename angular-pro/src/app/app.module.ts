import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { OneComponent } from './one/one.component';
import { ThreeComponent } from './three/three.component';
import { TwoComponent } from './two/two.component';

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent

  ],
  imports: [
    //Angular Modules
    BrowserModule,
    CommonModule,
    //Custom Modules
    AuthFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
