import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../../services/meals.service';

@Component({
    selector: 'list-item',
    styleUrls: ['list-item.component.scss'],
    template: `
    <div class="list-item">
        {{item | json}}
    </div>
    `
})

export class ListItemComponent {
    @Input()
    item?: Meal;
    constructor() { }

}
