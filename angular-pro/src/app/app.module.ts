import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { MyForDirective } from './myFor/my-for.directive';
import { OneComponent } from './one/one.component';
import { FileSizePipe } from './pipes/filesize.pipe';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { ThreeComponent } from './three/three.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { TwoComponent } from './two/two.component';

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
    //Custom Modules
    AuthFormModule,
    StockInventoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
