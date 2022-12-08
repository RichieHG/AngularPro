import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Route[] = [
    {
        path: '',
        component: MealsComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [],
    declarations: [MealsComponent],
    providers: [],
})
export class MealsModule { }
