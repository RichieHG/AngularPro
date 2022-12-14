import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Workout, WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    template:`
    <div class="workout">
        <div class="workout__title">
            <h1>
                <img src="/assets/img/workout.svg">
                <span *ngIf="workout$ | async as workout; else title;">
                    {{workout.name ? 'Edit' : 'Create'}} workout
                </span>
                <ng-template #title>
                    Loading...
                </ng-template>
            </h1>
        </div>
        <div *ngIf="workout$ | async as workout; else loading;">
            <workout-form (create)="addworkout($event)" (update)="updateworkout($event)" (remove)="removeworkout($event)"
            [workout]="workout"></workout-form>
        </div>
        <ng-template #loading>
            <div class="message">
                <img src="/assets/img/loading.svg">
                Fetching workout...
            </div>
        </ng-template>
    </div>
    `
})

export class WorkoutComponent implements OnInit, OnDestroy  {
    workout$?: Observable<Workout | undefined>;
    subscription?: Subscription;
    constructor(
        private workoutService: WorkoutsService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    async addworkout(event: Workout){
        await this.workoutService.addworkout(event);
        this.backToworkouts();
    }

    async updateworkout(event: Workout){
        const key = this.route.snapshot.params['id'];
        await this.workoutService.updateworkout(key,event);
        this.backToworkouts();
    }
    async removeworkout(event: Workout){
        const key = this.route.snapshot.params['id'];
        await this.workoutService.removeworkout(key);
        this.backToworkouts();
    }
    backToworkouts(){
        this.router.navigate(['workouts'])
    }

    ngOnInit() {
        this.subscription = this.workoutService.workouts$?.subscribe();
        this.workout$ = this.route.params.pipe(
            switchMap(param => {
                return this.workoutService.getworkout(param['id']);
            })
        );
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
