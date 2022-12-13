import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Workout } from 'src/health/shared/services/workouts.service';

@Component({
    selector: 'workout-form',
    styleUrls: ['workout-form.component.scss'],
    template:`
        <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Workout name is required</div>
          </label>
        </div>
        <div class="workout-form__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="createWorkout()"
              [disabled]="!form.valid"
              *ngIf="!exists">
              Create workout
            </button>
            <button
              type="button"
              class="button"
              (click)="updateWorkout()"
              [disabled]="!form.valid"
              *ngIf="exists">
              Save
            </button>
            <a class="button button--cancel" [routerLink]="['../']"> Cancel </a>
          </div>
          <div class="workout-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">
                Yes
              </button>
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>
            <button
              class="button button--delete"
              type="button"
              (click)="toggle()">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
    `
})

export class WorkoutFormComponent {
    toggled: boolean = false;
    exists: boolean = false;

    @Output()
    create: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output()
    update: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output()
    remove: EventEmitter<Workout> = new EventEmitter<Workout>();

    @Input()
    workout?: Workout;

    form: FormGroup = this.fb.group({
        name: ['', Validators.required]
    });
    constructor(private fb: FormBuilder) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.workout && this.workout.name) {
            this.exists = true;

            const value = this.workout;
            this.form.patchValue(value);
        }
    }
    get required() {
        return (
            this.form.get('name')?.hasError('required') &&
            this.form.get('name')?.touched
        );
    }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateWorkout(){
        if(this.form.valid){
            this.update.emit(this.form.value)
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }
    toggle() {
        this.toggled = !this.toggled;
    }

}
