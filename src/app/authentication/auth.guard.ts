import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { CURRENT_USER } from '../constant/auth.constant';
import { AuthenticationService } from '../authentication/authentication.service';
import {catchError, first, tap} from "rxjs/operators";
import {throwError} from "rxjs/index";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    // if (localStorage.getItem(CURRENT_USER) && !this.authService.isExpired()) {
    //   // currently logged in.
    //   return true;
    // }
    // // not logged in redirect to login page together with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;

    return this.authService.isLoggedIn$.pipe(
      first(),
      tap(
        isLoggedIn => {
          console.log('Can activate : is already logged in? ', isLoggedIn)
          if (!isLoggedIn) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          }
        }),
      catchError(
        (err, caught) => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return throwError('Cannot check if user is already logged in');
        })
    );
  }

  canLoad(route: Route): boolean | Promise<boolean> | Observable<boolean> {
    // if (localStorage.getItem(CURRENT_USER) && !this.authService.isExpired()) {
    //   // currently logged in.
    //   return true;
    // }
    // // not logged in redirect to login page together with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });
    // return false;

    return this.authService.isLoggedIn$.pipe(
      first(),
      tap(
        isLoggedIn => {
          console.log('Can load : is already logged in? ', isLoggedIn)
          if (!isLoggedIn) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });
          }
        }),
      catchError(
        (err, caught) => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });
          return throwError('Cannot check if user is already logged in');
        })
    );
  }
}
