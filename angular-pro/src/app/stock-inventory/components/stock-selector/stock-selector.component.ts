import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  styleUrls:['stock-selector.component.scss'],
  template: `
  <div [formGroup]="parent" class="stock-selector">
  <div formGroupName="selector">
      <select formControlName="product_id">
        <option value="">Select stock</option>
        <option *ngFor="let product of products" [value]="product.id">{{product.name}}</option>
      </select>
      <!-- <input type="number" step="10" min="10" max="1000" placeholder="Quantity" formControlName="quantity"> -->
      <stock-counter [step]="10" [min]="10" [max]="1000" formControlName="quantity"></stock-counter>
      <button type="button" (click)="onAdd()" [disabled]="stockExists || notSelected"> Add stock</button>
      <div class="stock-selector__error" *ngIf="stockExists">
        Item already exists in the stock
      </div>
    </div>
  </div>
  `
})

export class StockSelectorComponent {
  @Input()
  parent!: FormGroup;

  @Input()
  products?: Product[];
  constructor() { }

  @Output()
  added : EventEmitter<any> = new EventEmitter<any>();

  get stockExists(){
    return (
      this.parent.hasError('stockExists') &&
      this.parent.get('selector.product_id')?.dirty
    );
  }

  get notSelected(){
    return !this.parent.get('selector.product_id')?.value;
  }
  onAdd(){
    this.added.emit(this.parent?.get('selector')?.value);
    this.parent.get('selector')?.reset({
      product_id: '',
      quantity: 10
    });


    // this.parent.get('selector')?.patchValue({
    //   product_id: ''
    // }); //Only update value doesnt interact DOM
    // this.parent.get('selector')?.setValue({
    //   product_id: ''
    // }); //We have to set all object and doesnt change DOM
  }
}
