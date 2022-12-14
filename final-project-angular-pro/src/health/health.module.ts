import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth/shared/guards/auth.guard';
import { MealsModule } from './meals/meals.module';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Route[] = [
    {
        path: 'meals',
        loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'workouts',
        loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule),
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class HealthModule { }
