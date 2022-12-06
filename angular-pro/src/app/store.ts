import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { State } from './state';

const state: State = {
  playlist: []
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
    this.subject.next({
      ...this.value, [name]: state
    });
  }

}
