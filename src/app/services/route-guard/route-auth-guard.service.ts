import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteAuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.loggedInUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class ChildRouteAuthGuardService implements CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.loggedInUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
