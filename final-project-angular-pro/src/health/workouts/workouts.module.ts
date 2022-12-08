import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { WorkoutsComponent } from './containers/workouts/workouts.component';


export const ROUTES: Route[] = [
    {
        path: '',
        component: WorkoutsComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [],
    declarations: [
        WorkoutsComponent
    ],
    providers: [],
})
export class WorkoutsModule { }
