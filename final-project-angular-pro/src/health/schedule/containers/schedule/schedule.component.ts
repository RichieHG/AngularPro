import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { ScheduleItem, ScheduleList, ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'src/store';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
    <div class="schedule">
        <schedule-calendar
            [date]="(date$ | async)!"
            (change)="changeDate($event)"
            [items]="(schedule$ | async)!"
            (select)="changeSection($event)"></schedule-calendar>

        <schedule-assign
            *ngIf="open"
            [section]="selected$ | async"
            [list]="(list$ | async)!"
            (update)="assignItem($event)"
            (cancel)="closeAssign()"></schedule-assign>
    </div>
    `
})

export class ScheduleComponent implements OnInit, OnDestroy {

    open: boolean = false;
    date$? : Observable<Date>;
    schedule$?: Observable<ScheduleList>;
    selected$?: Observable<any>;
    list$?: Observable<Meal[] | Workout[]>;
    subscriptions?: Subscription[];
    constructor(
        private scheduleService: ScheduleService,
        private store: Store,
        private mealsService: MealsService,
        private workoutsService: WorkoutsService
    ) { }

    ngOnInit() {
        this.date$ = this.store.select<Date>('date');
        this.schedule$ = this.store.select<ScheduleList>('schedule');
        this.selected$ = this.store.select<any>('selected');
        this.list$ = this.store.select<any>('list');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe()
        ];
    }

    ngOnDestroy(){
        this.subscriptions?.forEach(sub => {
            sub.unsubscribe();
        });
    }

    changeDate(date: Date){
        this.scheduleService.updateDate(date);
    }
    changeSection(event: any){
        this.scheduleService.selectSection(event);
        this.open = true;
    }

    assignItem(items: string[]){
        this.scheduleService.updateItems(items);
        this.closeAssign();

    }

    closeAssign(){
        this.open = false;
    }
}
