import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild{
  constructor(
    private authService: AuthService
  ){

  }
  canLoad(){
    return this.authService.checkPermissions();
  }
  canActivate(){
    return this.authService.isLoggedIn();
  }

  canActivateChild(){
    return true;
  }
}
