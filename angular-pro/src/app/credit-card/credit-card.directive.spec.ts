import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CreditCardDirective } from "./credit-card.directive";

@Component({
  template:`
    <input type="text" [value]="value" credit-card>
  `
})
class TestComponent{
  value = 123456;
}

describe('CreditCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreditCardDirective,
        TestComponent
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('Should format the string with spaces', () =>{
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = '475123';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 23');

    directive.value = '4751237812041445';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 2378 1204 1445');
  });

  it('Should have a max-length of 16 characters', () =>{
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = '47512378120414451212121212';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 2378 1204 1445');
  });
})
