import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESOR],
  styleUrls: ['stock-counter.component.scss'],
  template:`
  <div class="stock-counter" [class.focused]="focus">
    <div>
      <div tabindex="0" (keydown)="onKeyDown($event)" (blur)="onBlur($event)" (focus)="onFocus($event)">
        <p>{{value}}</p>
        <div>
          <button type="button" (click)="increment()" [disabled]="value == max">
            +
          </button>
          <button type="button" (click)="decrement()" [disabled]="value == min">
            -
          </button>
        </div>
      </div>
    </div>
  </div>
  `
})

export class StockCounterComponent implements ControlValueAccessor {

  private onTouch? : Function;
  private onModelChange? : Function;

    @Output() changed = new EventEmitter<number>();

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }
  writeValue(value: any) {
      this.value = value || 0;
  }

  @Input()
  step: number = 10;
  @Input()
  min: number = 10;
  @Input()
  max: number = 1000;
  value: number = 10;

  focus: boolean = false;
  constructor() { }

  increment(){
    if(this.value < this.max){
      this.value = this.value + this.step;
      // this.onModelChange!(this.value);
      this.changed.emit(this.value);

    }
    // this.onTouch!();
  }

  decrement(){
    if(this.value > this.min){
      this.value = this.value - this.step;
      // this.onModelChange!(this.value);
      this.changed.emit(this.value);

    }
    // this.onTouch!();
  }

  onKeyDown(event: KeyboardEvent){
    const handlers: any = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    }
    if(handlers[event.code]){
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    // this.onTouch!();
  }

  onBlur(event: FocusEvent){
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    // this.onTouch!();
  }

  onFocus(event: FocusEvent){
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch!();
  }
}
