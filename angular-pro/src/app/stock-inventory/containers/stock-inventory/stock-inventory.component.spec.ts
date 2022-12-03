import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";
// import { StockBranchComponent } from "../../components/stock-branch/stock-branch.component";
// import { StockCounterComponent } from "../../components/stock-counter/stock-counter.component";
// import { StockProductsComponent } from "../../components/stock-products/stock-products.component";
// import { StockSelectorComponent } from "../../components/stock-selector/stock-selector.component";
import { Item } from "../../models/item.interface";
import { Product } from "../../models/product.interface";
import { StockInventoryService } from "../../services/stock-inventory.service";
import { StockInventoryComponent } from "./stock-inventory.component"

const cartItems: Item[] = [{product_id: 1, quantity: 10}, {product_id: 2, quantity: 5}];
const productItems: Product[] = [{id: 1, price: 10, name: 'Test'}, {id: 2, price: 100, name: 'AnotherTest'}];


class MockStockInventoryService{
  getCartItems(): Observable<Item[]>{
    return of(cartItems);
  }

  getProducts(): Observable<Product[]>{
    return of(productItems);
  }


}

describe('StockInvetoryComponent' , () =>{

  let component: StockInventoryComponent;
  let fixture: ComponentFixture<StockInventoryComponent>;
  let el: DebugElement;
  let service: StockInventoryService;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        StockInventoryComponent
        // StockBranchComponent,
        // StockCounterComponent,
        // StockProductsComponent,
        // StockSelectorComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: StockInventoryService, useClass: MockStockInventoryService}
      ],
      schemas: [
        NO_ERRORS_SCHEMA //Using it avoid the necesity to declare unused components into our TestingModule
      ]
    });

    fixture = TestBed.createComponent(StockInventoryComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = el.injector.get(StockInventoryService);
  });

  it('Should get cart items and products on init', () =>{
    spyOn(service, 'getProducts').and.callThrough();
    spyOn(service, 'getCartItems').and.callThrough();

    component.ngOnInit();

    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getProducts).toHaveBeenCalled();
  });

  it('Should create a product map from the service response', () =>{
    component.ngOnInit();
    expect(component.productMap?.get(1)).toEqual({id: 1, price: 10, name:'Test'});
    expect(component.productMap?.get(2)).toEqual({id: 2, price: 100, name:'AnotherTest'});
  });

  it('Should store the products response', () =>{
    component.ngOnInit();
    expect(component.products).toEqual(productItems);
  });

  it('Should create stock item for each cart item', () =>{
    spyOn(component, 'addStock');
    component.ngOnInit();
    expect(component.addStock).toHaveBeenCalledWith({product_id: 1, quantity: 10});
    expect(component.addStock).toHaveBeenCalledWith({product_id: 2, quantity: 5});
  });
})
