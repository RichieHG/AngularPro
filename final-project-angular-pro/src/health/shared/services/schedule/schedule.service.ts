import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, map, Observable, Subject, switchMap, tap, withLatestFrom } from "rxjs";
import { AuthService } from "src/auth/shared/services/auth/auth.service";
import { Store } from "src/store";
import { Meal } from "../meals/meals.service";
import { Workout } from "../workouts/workouts.service";

export interface ScheduleItem{
    meals?: Meal[] | null,
    workouts?: Workout[] | null,
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList{
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key:string]: any
}

@Injectable()
export class ScheduleService{
    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();
    private itemList$ = new Subject();

    items$ = this.itemList$.pipe(
        withLatestFrom(this.section$),
        map(([items, section]: any[]) => {
            const id = section.data.$key;

            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            };

            const payload = {
                ...(id ? (({ $key, $exists, ...others }) => others)(section.data) : defaults),
                ...items
            };

            if(id){
                return this.updateSection(id, payload);
            }
            else{
                return this.createSection(payload);
            }
        })
    )
    selected$ = this.section$.pipe(
        tap((next:any) => this.store.set('selected', next))
    );

    list$ =  this.section$.pipe(
        map((value: any) => this.store.value[value.type]),
        tap((next:any) => this.store.set('list', next))
    );

    schedule$: Observable<ScheduleList> = this.date$.pipe(
        tap((next: Date) => this.store.set('date', next)),
        map((day: Date) => {
            const startAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
            const endAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)).getTime() - 1;
            return {startAt, endAt}
        }),
        switchMap(({startAt, endAt}: any) => this.getSchedule(startAt, endAt)),
        map(data => {
            const mapped: ScheduleList = {};
            for(const prop of data){
                if(!mapped[prop.payload.val()!.section]){
                    mapped[prop.payload.val()!.section] = {
                        ...prop.payload.val(), $key: prop.key, $exists: prop.payload.exists
                    };
                }
            }
            return mapped;
        }),
        tap((next: ScheduleList) => this.store.set('schedule', next))
    );
    constructor(
        private store: Store,
        private authService: AuthService,
        private db: AngularFireDatabase
    ){

    }

    get uid(){
        return this.authService.user?.uid;
    }
    updateDate(date: Date){
        this.date$.next(date);
    }

    private getSchedule(startAt: number, endAt: number){
        return this.db.list<ScheduleItem>(
            `schedule/${this.uid}`,ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
        ).snapshotChanges()
    }

    selectSection(event:any){
        this.section$.next(event);
    }

    updateItems(items: string[]){
        this.itemList$.next(items);
    }

    private updateSection(key: string, payload: ScheduleItem){
        this.db.object(`schedule/${this.uid}/${key}`).update(payload);
    }

    private createSection(payload: ScheduleItem){
        this.db.list(`schedule/${this.uid}`).push(payload)
    }
}
