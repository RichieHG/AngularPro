import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MealComponent } from './containers/meal/meal.component';

import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Route[] = [
    {
        path: '',
        component: MealsComponent
    },
    {
        path: 'new',
        component: MealComponent
    },
    {
        path: ':id',
        component: MealComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    exports: [],
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    providers: [],
})
export class MealsModule { }
