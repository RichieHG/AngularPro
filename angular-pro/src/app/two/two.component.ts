import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'example-two',
  // encapsulation:ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
    /* .example-two {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 10px;
      padding: 5px 7px;
    }
    .example-one {
      border: 3px solid #9f72e6;
      font-size: 14px;
      color: #9f72e6;
      padding: 5px 7px;
    } */
    .example-two {
      font-size: 19px;
      margin-bottom: 10px;
    }
  `],
  template: `
    <!-- <div class="example-two">
      Example Two
    </div>
    <div class="example-one">
      Example One!
    </div> -->
    <div class="example-two">
      <h4>{{ user.name }}</h4>
      <h5>{{ user.age }} years old</h5>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should update</p>
    </div>
  `
})

export class TwoComponent{
  @Input()
  user: any;

  update() {
    this.user.name = 'Scott Raynor';
  }
}
