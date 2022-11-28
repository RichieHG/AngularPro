import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import {HttpClientModule} from "@angular/common/http";
import { StockInventoryService } from './services/stock-inventory.service';
import { StockCounterComponent } from './components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    StockCounterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    StockInventoryComponent
  ],
  providers: [
    StockInventoryService
  ],
})
export class StockInventoryModule { }
