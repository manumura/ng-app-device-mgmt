import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { CURRENT_USER } from '../constant/auth.constant';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if (localStorage.getItem(CURRENT_USER) && !this.authService.isExpired()) {
      // currently logged in.
      return true;
    }
    // not logged in redirect to login page together with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canLoad(route: Route): boolean | Promise<boolean> | Observable<boolean> {
    if (localStorage.getItem(CURRENT_USER) && !this.authService.isExpired()) {
      // currently logged in.
      return true;
    }
    // not logged in redirect to login page together with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });
    return false;
  }
}
