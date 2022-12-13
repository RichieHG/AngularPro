import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Workout, WorkoutsService } from 'src/health/shared/services/workouts.service';
import { Store } from 'src/store';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    template: `
   <div class="workouts">
        <div class="workouts__title">
            <h1>
                <img src="/assets/img/workout.svg">
                Your workouts
            </h1>
            <a class="btn__add" [routerLink]="['../workouts/new']">
                <img src="/assets/img/add-white.svg" alt="">
                New workout
            </a>
        </div>
        <div *ngIf="workouts$ | async as workouts; else loading; ">
            <div class="message" *ngIf="!workouts.length">
                <img src="/assets/img/face.svg">
                No workouts, add new workout to start
            </div>
            <list-item *ngFor="let workout of workouts" [item]="workout" (remove)="removeWorkout($event)"></list-item>
        </div>
        <ng-template #loading>
            <div class="message">
                <img src="/assets/img/loading.svg" alt="">
                Fetching workouts...
            </div>
        </ng-template>
    </div>
    `
})

export class WorkoutsComponent implements OnInit {
    workouts$?: Observable<Workout[]>;
    subscription?: Subscription;
    constructor(
        private workoutsService: WorkoutsService,
        private store: Store
    ) { }

    ngOnInit() {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutsService.workouts$?.subscribe();
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    removeWorkout(event: Workout){
        this.workoutsService.removeworkout(event.$key);
    }
}
