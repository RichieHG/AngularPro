import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MealsModule } from './meals/meals.module';

export const ROUTES: Route[] = [
    {
        path: 'meals',
        loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
    },
    {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
        path: 'workouts',
        loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule)
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class HealthModule { }
