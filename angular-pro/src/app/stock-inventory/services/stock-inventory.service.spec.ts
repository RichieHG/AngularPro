import { HttpClient, HttpClientModule, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Item } from "../models/item.interface";
import { Product } from "../models/product.interface";
import { StockInventoryService } from "./stock-inventory.service";

function createResponse(body: any[]) {
  return of(body);
}
class MockHttp{
  get(){
  }
}

const cartItems: Item[] = [{product_id: 1, quantity: 10}, {product_id: 2, quantity: 5}];
const productItems: Product[] = [{id: 1, price: 10, name: 'Test'}, {id: 2, price: 100, name: 'AnotherTest'}];

describe('StockInventoryService', () =>{

  let service: StockInventoryService;
  let http: HttpClient;
  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers:[
        StockInventoryService,
        {provide: HttpClient, useClass: MockHttp}
      ]
    });
    http = bed.inject(HttpClient);
    service = bed.inject(StockInventoryService);
  });
  it('Should get cart items', () =>{
    spyOn(http,'get').and.returnValue(createResponse([...cartItems]));
    service.getCartItems()
      .subscribe((result: Item[]) =>{
        expect(result.length).toBe(2);
        expect(result).toEqual(cartItems);
      })
  });
  it('Should get product items', () =>{
    spyOn(http,'get').and.returnValue(createResponse([... productItems]));
    service.getProducts()
      .subscribe((result: Product[]) =>{
        expect(result.length).toBe(2);
        expect(result).toEqual(productItems);
      })
  });
})
