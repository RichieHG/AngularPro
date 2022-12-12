import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
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

    meals$?: Observable<Meal[]> =this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges()
    .pipe(
        map(rawItems => {
            return rawItems.map( p => {
                return {
                    ...p.payload.val(), $key: p.key, $exists: p.payload.exists
                } as Meal
            })
        }),
        tap((next:Meal[]) => {
            this.store.set('meals', next);
        }),
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

    removeMeal(key: string){
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}
