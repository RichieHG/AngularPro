import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { MailModule } from './mail/mail.module';
import { MyForDirective } from './myFor/my-for.directive';
import { OneComponent } from './one/one.component';
import { FileSizePipe } from './pipes/filesize.pipe';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { ThreeComponent } from './three/three.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { TwoComponent } from './two/two.component';

export const ROUTES: Routes = [
  { path: '**', redirectTo: 'folder/inbox' }
];

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    CreditCardDirective,
    TooltipDirective,
    MyForDirective,
    FileSizePipe

  ],
  imports: [
    //Angular Modules
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(ROUTES),
    //Custom Modules
    AuthFormModule,
    StockInventoryModule,
    MailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
