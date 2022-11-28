import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-branch',
  styleUrls:['stock-branch.component.scss'],
  template: `
  <div [formGroup]="parent">
    <div formGroupName="store">
      <input type="text" placeholder="Branch ID" formControlName="branch">
      <div *ngIf="required('branch')" ngClass="error">
        Branch ID is required
      </div>
      <div *ngIf="invalid" ngClass="error">
        Invalid branch code: 1 letter, 3 numbers
      </div>
      <div *ngIf="unknown" ngClass="error">
        Unknwon branch, please check the ID
      </div>
      <input type="text" placeholder="Manager Code" formControlName="code">
      <div *ngIf="required('code')" ngClass="error">
        Code is required
      </div>
    </div>
  </div>
  `
})

export class StockBranchComponent {

  @Input()
  parent!: FormGroup;

  get invalid() {
    return (
      this.parent.get('store.branch')?.hasError('invalidBranch') &&
      this.parent.get('store.branch')?.dirty &&
      !this.required('branch')
    );
  }

  get unknown(){
    return(
      this.parent.get('store.branch')?.hasError('unknownBranch') &&
      this.parent.get('store.branch')?.dirty
    );
  }
  constructor() { }

  required(name: string){
    return this.parent.get(`store.${name}`)?.hasError('required') && this.parent.get(`store.${name}`)?.touched
  }
}
