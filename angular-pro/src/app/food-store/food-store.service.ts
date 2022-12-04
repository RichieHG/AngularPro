import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { FOOD_STORE_CONFIG, FoodStoreConfig } from './config';

@Injectable()
export class FoodStoreService {
  constructor(
    private http: HttpClient,
    @Inject(FOOD_STORE_CONFIG) private config: FoodStoreConfig
  ) {}

  getStore() {

    let search = new HttpParams({fromObject: {
      id: this.config.storeId,
      token: this.config.storeToken
    }});

    return this.http.get(`http://localhost:3000/stores`, {params: search})
      .pipe(
        map((response: any) => response[0])
      )
  }
}
