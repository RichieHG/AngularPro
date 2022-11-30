import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { MailService } from "../../mail.service";
import { Mail } from "../../models/mail.interface";

@Injectable()
export class MailViewResolve implements Resolve<Mail>{
  constructor(
    private mailService: MailService
  ){

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.mailService.getMessage(route.params['id'])
  }
}
