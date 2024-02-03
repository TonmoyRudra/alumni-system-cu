import { GlobalService } from './../shared/service/global/global.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AutenticationService } from '../shared/service/autentication/autentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authService: AutenticationService,
    public globalService: GlobalService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // return true;
    if (
      route.routeConfig.path === 'login' ||
      route.routeConfig.path === 'signup'
    ) {
      if (this.authService.loggedIn()) {
        this.router.navigateByUrl('/');
      } else {
        return true;
      }
    } else {
      if (this.authService.loggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        // window.location.href = this.globalService.ssoBracUrl;
        return false;
      }
    }
  }
}
