import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';
import { MealsService } from './services/meals.service';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule
    ],
    exports: [],
    declarations: [],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule>{
        return {
            ngModule: SharedModule,
            providers: [
                MealsService
            ]
        }
    }
}
