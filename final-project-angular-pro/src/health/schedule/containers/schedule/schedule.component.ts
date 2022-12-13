import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleService } from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'src/store';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
    <div class="schedule">
        <schedule-calendar [date]="(date$ | async)!" (change)="changeDate($event)"></schedule-calendar>
    </div>
    `
})

export class ScheduleComponent implements OnInit, OnDestroy {

    date$? : Observable<Date>;
    subscriptions?: Subscription[];
    constructor(
        private scheduleService: ScheduleService,
        private store: Store
    ) { }

    ngOnInit() {
        this.date$ = this.store.select<Date>('date');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe()
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
}
