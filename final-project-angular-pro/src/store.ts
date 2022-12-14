import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { User } from "src/auth/shared/services/auth/auth.service";
import { Meal } from "./health/shared/services/meals/meals.service";
import { ScheduleItem } from "./health/shared/services/schedule/schedule.service";
import { Workout } from "./health/shared/services/workouts/workouts.service";

export interface State {
  user?: User | null ,
  meals?: Meal[] | null,
  date?: Date,
  workouts?: Workout[] | null,
  schedule?: ScheduleItem[] | null,
  selected?: any,
  list?: any,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  date: undefined,
  workouts: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined
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
