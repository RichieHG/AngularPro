import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forkJoin, map } from "rxjs";
import { Item } from "../../models/item.interface";
import { Product } from "../../models/product.interface";
import { StockInventoryService } from "../../services/stock-inventory.service";
import { StockValidators } from "./stock-inventory.validators";

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
  <div class="stock-inventory">
    <form [formGroup]="form" (ngSubmit)="onSubmit()">

      <stock-branch [parent]="form"></stock-branch>
      <stock-selector [parent]="form" [products]="products" (added)="addStock($event)"></stock-selector>
      <stock-products [parent]="form" [map]="productMap!" (removed)="removeStock($event)"></stock-products>
      <div class="stock-inventory__price">
        Total: {{total |  currency:'USD':'symbol'}}
      </div>
      <div class="stock-inventory__buttons">
        <button type="submit" [disabled]="form.invalid">
          Order stock
        </button>
      </div>

      <pre>{{form.value | json}}</pre>
    </form>
  </div>
  `
})
export class StockInventoryComponent implements OnInit {

  // products: Product[] = [
  //   {
  //     id: 1,
  //     price: 2800,
  //     name: 'MacBook Pro'
  //   },
  //   {
  //     id: 2,
  //     price: 50,
  //     name: 'USB-C Adaptor'
  //   },
  //   {
  //     id: 3,
  //     price: 400,
  //     name: 'iPod'
  //   },
  //   {
  //     id: 4,
  //     price: 900,
  //     name: 'iPhone'
  //   },
  //   {
  //     id: 5,
  //     price: 600,
  //     name: 'Apple Watch'
  //   }
  // ]


  // form = new FormGroup({
  //   store: new FormGroup({
  //     branch: new FormControl(''),
  //     code: new FormControl('')
  //   }),
  //   selector: this.createStock({}),
  //   stock: new FormArray([
  //     this.createStock({ product_id: 1, quantity: 10 }),
  //     this.createStock({ product_id: 3, quantity: 50 }),
  //   ])
  // });

  products?: Product[];
  productMap?: Map<number, Product>;

  total?: number;
  form = this.fb.group({
      store: this.fb.group({
        branch: ['',
          [
            Validators.required,
            StockValidators.checkBranch,
          ],
          [
            this.validateBranch.bind(this)
          ]
        ],
        code: ['', Validators.required]
      }),
      selector: this.createStock({}),
      stock: this.fb.array([
        // this.createStock({ product_id: 1, quantity: 10 }),
        // this.createStock({ product_id: 3, quantity: 50 }),
      ])
    },
    {
      validators: [
        StockValidators.checkStockExists
      ]
    }
  );
  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {
  }
  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    forkJoin([cart, products]).subscribe(([cart, products]: [cart:Item[], product: Product[]]) =>
    {
      const myMap = products.map<[number, Product]>(product => [product.id, product]);

      this.productMap = new Map<number, Product>(myMap);
      this.products = products;

      cart.forEach(item => this.addStock(item));
    });

    this.form.get('stock')?.valueChanges.subscribe((value: any) => this.calculateTotal(value))
  }
  createStock(stock: { product_id?: any; quantity?: any; }) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }
  addStock(stock: any) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }
  onSubmit() {
    console.log('Submit:', this.form.value)
  }

  calculateTotal(value: Item[]){
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap?.get(next.product_id)?.price!)
    }, 0)
    this.total = total;
  }

  validateBranch(control: AbstractControl){
    return this.stockService.checkBranchID(control.value)
            .pipe(
              map((response: boolean) => response ? null : {unknownBranch: true})
            );
  }
}
