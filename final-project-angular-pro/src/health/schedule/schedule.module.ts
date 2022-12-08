import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ScheduleComponent } from './containers/schedule/schedule.component';


export const ROUTES: Route[] = [
    {
        path:'',
        component: ScheduleComponent
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
        ScheduleComponent
    ],
    providers: [],
})
export class ScheduleModule { }
