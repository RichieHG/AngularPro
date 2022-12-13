import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
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
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent
    ],
    providers: [],
})
export class ScheduleModule { }
