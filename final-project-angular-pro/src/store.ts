import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { User } from "src/auth/shared/services/auth/auth.service";
import { Meal } from "./health/shared/services/meals.service";
import { Workout } from "./health/shared/services/workouts.service";

export interface State {
  user?: User | null ,
  meals?: Meal[] | null,
  workouts?: Workout[] | null,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined
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
