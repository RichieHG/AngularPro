import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { of } from "rxjs";
import { MailViewComponent } from "./mail-view.component";

@Injectable()
export class MailViewGuard implements CanDeactivate<MailViewComponent>{
  canDeactivate(component: MailViewComponent){
    if(component.hasUnsavedChanges){
      window.confirm('Are you sure to leave?');
    }
    return true;
  }
}
