import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { DrinkViewerComponent } from './containers/drink-viewer.component';
import { PizzaViewerComponent } from './containers/pizza-viewer.component';
import { SideViewerComponent } from './containers/side-viewer.component';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { FoodStoreModule } from './food-store/food-store.module';
import { FoodService } from './food.service';
import { MailModule } from './mail/mail.module';
import { MyForDirective } from './myFor/my-for.directive';
import { OneComponent } from './one/one.component';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { ThreeComponent } from './three/three.component';
import { API_TOKEN } from './token';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { TwoComponent } from './two/two.component';

export class CustomPreload implements PreloadingStrategy{
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? fn() :  of(null)
  }
}
export const ROUTES: Routes = [
  {
    path: 'dashboard',
    data:{
      preload: true
    },
    canLoad: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'mail/folder/inbox'
  }
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
    FileSizePipe,
    DrinkViewerComponent,
    PizzaViewerComponent,
    SideViewerComponent

  ],
  imports: [
    //Angular Modules
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy:  CustomPreload}),
    HttpClientModule,
    //Custom Modules
    AuthFormModule,
    StockInventoryModule,
    MailModule,
    AuthModule,
    FoodStoreModule.forRoot({
      storeId: 10292,
      storeToken: 'eca938c99a0e9ff91029dc'
    })
  ],
  providers: [
    CustomPreload,
    {provide: API_TOKEN, useValue: 'http://localhost:3000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
