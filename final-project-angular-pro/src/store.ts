import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { User } from "src/auth/shared/services/auth/auth.service";
import { Meal } from "./health/shared/services/meals.service";

export interface State {
  user?: User | null ,
  meals?: Meal[] | null,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((data:any) => data[name]));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
