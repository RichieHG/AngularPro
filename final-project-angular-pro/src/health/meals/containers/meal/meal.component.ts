import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal, MealsService } from 'src/health/shared/services/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    template:`
    <div class="meal">
        <div class="meal__title">
            <h1>
                <img src="/assets/img/food.svg">
                <span>Create meal</span>
            </h1>
        </div>
        <div>
            <meal-form (create)="addMeal($event)"></meal-form>
        </div>
    </div>
    `
})

export class MealComponent   {
    constructor(
        private mealService: MealsService,
        private router: Router
    ) { }

    async addMeal(event: Meal){
        await this.mealService.addMeal(event);
        this.backToMeals();
    }

    backToMeals(){
        this.router.navigate(['meals'])
    }

}
