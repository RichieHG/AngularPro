import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_TOKEN } from './token';


@Injectable()
export class FoodService {
  constructor(
    private http: HttpClient,
    @Inject(API_TOKEN) private api: string
  ) {
    // console.log(this.api)
  }
  getFood(): Observable<any[]> {
    return this.http.get(this.api)
      .pipe(
      map((response: any) => response)
      )
  }


  getDrinks(): Observable<any[]> {
    return this.http.get('http://localhost:3000/drinks')
      .pipe(
      map((response: any) => response)
      )
  }

  getPizzas(): Observable<any[]> {
    return this.http.get('http://localhost:3000/pizzas')
      .pipe(
      map((response: any) => response)
      )
  }

  getSides(): Observable<any[]> {
    return this.http.get('http://localhost:3000/sides')
      .pipe(
      map((response: any) => response)
      )
  }
}
