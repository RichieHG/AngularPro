import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from '../models/item.interface';
import { Product } from '../models/product.interface';

const CART_URL = ' http://localhost:3000/cart';
const PRODUCTS_URL = ' http://localhost:3000/products';

@Injectable()
export class StockInventoryService {
  constructor(
    private http: HttpClient
  ) { }

  getCartItems(): Observable<Item[]>{
    return this.http.get<Item[]>(CART_URL)
          .pipe(
            map((response: Item[]) => response),
            catchError((error: HttpResponse<any>) => throwError(() => error))
          );
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCTS_URL)
          .pipe(
            map((response: Product[]) => response),
            catchError((error: HttpResponse<any>) => throwError(() => error))
          );
  }
}
