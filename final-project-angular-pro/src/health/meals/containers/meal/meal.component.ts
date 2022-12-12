import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    template:`
    <div class="meal">
        <div class="meal__title">
            <h1>
                <img src="/assets/img/food.svg">
                <span *ngIf="meal$ | async as meal; else title;">
                    {{meal.name ? 'Edit' : 'Create'}} meal
                </span>
                <ng-template #title>
                    Loading...
                </ng-template>
            </h1>
        </div>
        <div *ngIf="meal$ | async as meal; else loading;">
            <meal-form (create)="addMeal($event)" (update)="updateMeal($event)" (remove)="removeMeal($event)"
            [meal]="meal"></meal-form>
        </div>
        <ng-template #loading>
            <div class="message">
                <img src="/assets/img/loading.svg">
                Fetching meal...
            </div>
        </ng-template>
    </div>
    `
})

export class MealComponent implements OnInit, OnDestroy  {
    meal$?: Observable<Meal | undefined>;
    subscription?: Subscription;
    constructor(
        private mealService: MealsService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    async addMeal(event: Meal){
        await this.mealService.addMeal(event);
        this.backToMeals();
    }

    async updateMeal(event: Meal){
        const key = this.route.snapshot.params['id'];
        await this.mealService.updateMeal(key,event);
        this.backToMeals();
    }
    async removeMeal(event: Meal){
        const key = this.route.snapshot.params['id'];
        await this.mealService.removeMeal(key);
        this.backToMeals();
    }
    backToMeals(){
        this.router.navigate(['meals'])
    }

    ngOnInit() {
        this.subscription = this.mealService.meals$?.subscribe();
        this.meal$ = this.route.params.pipe(
            switchMap(param => {
                return this.mealService.getMeal(param['id']);
            })
        );
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
