import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map, Observable, Subject, switchMap, tap} from "rxjs";
import { AuthService } from "src/auth/shared/services/auth/auth.service";
import { Store } from "src/store";

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {

    private user$?: Subject<firebase.default.User>;
    meals$?: Observable<Meal[]> =this.db.list<Meal>(`meals/${this.uid}`).valueChanges()
    .pipe(
        tap((next:Meal[]) => this.store.set('meals', next))
    );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ){

    }

    get uid(){
        return this.authService.user?.uid
    }

    addMeal(meal: Meal){
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

}
