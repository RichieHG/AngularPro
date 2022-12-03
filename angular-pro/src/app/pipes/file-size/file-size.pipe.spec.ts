import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

//This config is already done in test.ts
// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting()
// );

import { FileSizePipe } from "./file-size.pipe";

describe('FileSizePipe', () => {

  describe('Shallow FileSizePipe test', () => {
    @Component({
      template: `
        Size: {{size | filesize: suffix}}
      `
    })
    class TestComponent{
      suffix?: string;
      size: number = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() =>{
      TestBed.configureTestingModule({
        declarations: [
          FileSizePipe,
          TestComponent
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });
    it('Should convert bytes to megabytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
      component.size = 1029281;
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 0.98MB');

    });
    it('Should use the default extension when not supplied', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');

    });
    it('Should override extension when supplied', () => {
      component.suffix = 'myExt'
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74myExt');

    });
  });

  describe('Isolate FileSizePipe test', () => {
    const pipe = new FileSizePipe();
    it('Should convert bytes to megabytes', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });
    it('Should use the default extension when not supplied', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });
    it('Should override extension when supplied', () => {
      expect(pipe.transform(123456789, 'Megabytes')).toBe('117.74Megabytes');
      expect(pipe.transform(987654321, 'myExt')).toBe('941.90myExt');
    });
  });

})
