import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { filter, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import { AuthService } from "src/auth/shared/services/auth/auth.service";
import { Store } from "src/store";

export interface Workout {
    name: string,
    type: string, // endurance | strength,
    strength: any,
    endurance: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

    workouts$: Observable<Workout[]> =this.db.list<Workout>(`workouts/${this.uid}`).snapshotChanges()
    .pipe(
        map(rawItems => {
            return rawItems.map( p => {
                return {
                    ...p.payload.val(), $key: p.key, $exists: p.payload.exists
                } as Workout
            })
        }),
        tap((next:Workout[]) => {
            this.store.set('workouts', next);
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

    getworkout(key: string){
        if(!key) return of({} as Workout);
        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map((workouts: Workout[]) =>  workouts.find((workout: Workout) => workout.$key === key))
        )
    }

    addworkout(workout: Workout){
        return this.db.list(`workouts/${this.uid}`).push(workout);
    }

    updateworkout(key: string ,workout: Workout){
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeworkout(key: string){
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }
}
