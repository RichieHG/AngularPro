import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
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
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    exports: [],
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent,
        ScheduleSectionComponent,
        ScheduleAssignComponent
    ],
    providers: [],
})
export class ScheduleModule { }
