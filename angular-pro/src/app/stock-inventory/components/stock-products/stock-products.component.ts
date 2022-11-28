import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-products',
  styleUrls:['stock-products.component.scss'],
  template: `
  <div [formGroup]="parent" class="stock-product">
    <div formArrayName="stock">
      <div *ngFor="let item of stocks; let i = index">
        <div class="stock-product__content" [formGroupName]="i">
          <div class="stock-product__name">
            {{getProduct(item.value.product_id)?.name}}
          </div>
          <div class="stock-product__price">
            {{getProduct(item.value.product_id)?.price | currency: 'USD'}}
          </div>
          <input type="number" step="10" min="10" max="1000" formControlName="quantity">
          <button type="button" (click)="onRemove(item, i)"> Remove </button>
        </div>
      </div>
    </div>
  </div>
  `
})

export class StockProductsComponent {
  @Input()
  parent!: FormGroup;

  @Input()
  map!: Map<number,Product>;

  @Output()
  removed: EventEmitter<any> = new EventEmitter<any>();
  get stocks(){
    return (this.parent?.get('stock') as FormArray).controls;
  }


  getProduct(id: number){
    return this.map.get(id);
  }
  onRemove(group: any, index:any){
    this.removed.emit({group, index})
  }
}
