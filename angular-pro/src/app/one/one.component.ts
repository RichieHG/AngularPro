import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'example-one',
  // encapsulation: ViewEncapsulation.Emulated, //Default
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    /* .example-one {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 50px;
      padding: 10px 20px;
    } */
    .example-one {
      font-size: 19px;
      margin-bottom: 10px;
    }
  `],
  template: `
    <!-- <div class="example-one">
      Example One
    </div> -->
    <div class="example-one">
      <h4>{{ user.name }}</h4>
      <h5>{{ user.age }} years old</h5>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should not update</p>
    </div>
  `
})

export class OneComponent{
  @Input()
  user: any;

  update() {
    this.user.name = 'Matt Skiba';
  }
}
