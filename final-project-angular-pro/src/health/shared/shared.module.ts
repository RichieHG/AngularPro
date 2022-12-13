import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MealsService } from './services/meals.service';
import { WorkoutsService } from './services/workouts.service';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule
    ],
    exports: [
        ListItemComponent
    ],
    declarations: [
        ListItemComponent
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule>{
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService
            ]
        }
    }
}
