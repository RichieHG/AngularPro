import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';
import { MealsService } from './services/meals/meals.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { WorkoutsService } from './services/workouts/workouts.service';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule
    ],
    exports: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ],
    declarations: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule>{
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService,
                ScheduleService
            ]
        }
    }
}
