import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


import { FoodService } from '../food.service';

interface Drink {
  name: string,
  price: number
}

export function DrinkFactory(http: HttpClient) {
  return new FoodService(http,'http://localhost:3000/drinks')
}

export abstract class DrinkService {
  getDrinks: (() => Observable<Drink[]>) | any;
}

@Component({
  selector: 'drink-viewer',
  providers: [
    // FoodService // == {provide: FoodService, useClass: FoodService}
    // {
    //   provide: FoodService,
    //   useFactory: DrinkFactory,
    //   deps: [
    //     HttpClient
    //   ]
    // }
    FoodService,
    {
      provide: DrinkService,
      useExisting: FoodService
    }
  ],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency:'USD' }}
      </div>
    </div>
  `
})
export class DrinkViewerComponent implements OnInit {
  items$?: Observable<Drink[]>;
  constructor(private foodService: DrinkService) {}
  ngOnInit() {
    // this.items$ = this.foodService.getFood();
    this.items$ = this.foodService.getDrinks();
  }
}
