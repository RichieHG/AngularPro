import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { StockCounterComponent } from "./stock-counter.component"

describe('StockCounterComponent', () => {

  let component: StockCounterComponent;
  let fixture: ComponentFixture<StockCounterComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockCounterComponent
      ]
    })

    fixture = TestBed.createComponent(StockCounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.value = 10;
  });

  it('Should increment correctly', () => {
    component.increment();
    expect(component.value).toBe(20);
  });

  it('Should decrement correctly', () => {
    component.increment();
    expect(component.value).toBe(20);
    component.decrement();
    expect(component.value).toBe(10);
  });

  it('Should not decrement below the minium value', () => {
    component.increment();
    expect(component.value).toBe(20);
    component.decrement();
    expect(component.value).toBe(10);
    component.decrement();
    expect(component.value).toBe(10);
  });

  it('Should not increment over the maximum value', () => {
    for (let i = 0; i < 200; i++) {
      component.increment();
    }
    expect(component.value).toBe(1000);

  });

  it('Should not increment over the maximum value (Inputs)', () => {
    component.value = 0;
    component.step = 20;
    component.max = 20;

    component.increment();
    component.increment();

    expect(component.value).toBe(20);

  });

  it('Should call the output on value change', () => {
    spyOn(component.changed, 'emit').and.callThrough();

    component.value = 0;
    component.step = 100;
    component.increment();

    expect(component.changed.emit).toHaveBeenCalledWith(100)
  });

  it('Should increment when the + button is clicked', () => {
    component.value = 0;
    component.step = 10;
    el.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe(10);
    expect(el.query(By.css('p')).nativeElement.textContent).toBe('10');
  });
  it('Should increment when the arrow-up button is clicked', () => {
    component.value = 0;
    component.step = 10;

    const event = new Event('KeyboardEvent') as any;
    event.code = 'ArrowUp';
    el.query(By.css('.stock-counter > div > div')).triggerEventHandler('keydown', event);
    fixture.detectChanges();
    expect(component.value).toBe(10);
  });

});
