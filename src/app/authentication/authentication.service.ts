import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import {
  CURRENT_USER,
  TOKEN_AUTHENTICATION_ENDPOINT,
  TOKEN_LOGOUT_ENDPOINT,
  TOKEN_AUTH_PASSWORD,
  TOKEN_AUTH_USERNAME,
  TOKEN_NAME, TOKEN_EXPIRY, TOKEN_EXPIRY_VALUE
} from '../constant/auth.constant';
import {User} from "./user.model";

export const ANONYMOUS_USER: User = {
  id: undefined,
  username: ''
};

@Injectable({providedIn: 'root'}) // Angular 6+
export class AuthenticationService {

  // private user = new BehaviorSubject<User>(undefined);
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  // user$: Observable<User> = this.user.asObservable()
  //   .pipe(
  //     filter(user => !!user)
  //   );

  // isLoggedIn$: Observable<boolean> = this.user$
  //   .pipe(
  //     map(user => {
  //       console.log('user id defined: ', !!user.id);
  //       return !!user.id;
  //     })
  //   );

  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$
  //   .pipe(
  //     map(isLoggedIn => !isLoggedIn)
  //   );

  constructor(private http: HttpClient) {
    // TODO : Check if user is already logged in with cookie
    // http.get<User>('http://localhost:17172/api/v1/session')
    //   .subscribe(user => {
    //     console.log(user);
    //     this.subject.next(user ? user : ANONYMOUS_USER);
    //   });

    // http.get<User>('/api/user')
    //   .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
  }

  login(username:string, password:string ) {
    return this.http.post<User>(TOKEN_AUTHENTICATION_ENDPOINT, {username, password}, { withCredentials: true })
      .pipe(
        shareReplay(),
        tap(result => {
          console.log('login: ', result);
          // this.user.next(result);
          this.isLoggedIn.next(true);
        })
    );
  }

  logout() : Observable<any> {
    return this.http.post(TOKEN_LOGOUT_ENDPOINT, null, { withCredentials: true })
      .pipe(
        shareReplay(),
        tap(result => {
          console.log('logout: ', result);
          // this.user.next(ANONYMOUS_USER);
          this.isLoggedIn.next(false);
        })
      );
  }

  // private loggedIn = new BehaviorSubject<boolean>(false);
  // constructor(private http: HttpClient) {}

  // login(username: string, password: string) {
  //
  //   const body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&grant_type=password';
  //   console.log(body);
  //   let headers = new HttpHeaders();
  //   headers = headers
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
  //
  //   return this.http.post<any>(TOKEN_AUTHENTICATION_ENDPOINT, body, { headers: headers, withCredentials: true })
  //     .pipe(map(result => {
  //       console.log(result);
  //       // login successful if there's a token in the response
  //       if (result && result.hasOwnProperty(TOKEN_NAME)) {
  //         // store user details and token in local storage to keep user logged in
  //         localStorage.setItem(CURRENT_USER, JSON.stringify(result));
  //         const expiry = new Date();
  //         if (result.expires_in) {
  //           expiry.setTime(expiry.getTime() + (parseInt(result.expires_in, 10) * 1000));
  //         } else {
  //           expiry.setTime(expiry.getTime() + (TOKEN_EXPIRY_VALUE * 1000));
  //         }
  //         // store the token expiry date for validation.
  //         localStorage.setItem(TOKEN_EXPIRY, expiry.toString());
  //         this.loggedIn.next(true);
  //       }
  //       return result;
  //     }));
  // }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem(CURRENT_USER);
  //   this.loggedIn.next(false);
  // }

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  // refresh() {
  //   console.log('Current user: ', localStorage.getItem(CURRENT_USER));
  //   console.log('Token expiry', localStorage.getItem(TOKEN_EXPIRY));
  //   if (localStorage.getItem(CURRENT_USER) && !this.isExpired()) {
  //     this.loggedIn.next(true);
  //   }
  // }

  // Checks if the token is expired then remove it from the storage.
  // isExpired(): boolean {
  //   const expiryDate = new Date(localStorage.getItem(TOKEN_EXPIRY));
  //   const current = new Date();
  //   if (expiryDate && current > expiryDate) {
  //     localStorage.removeItem(CURRENT_USER);
  //     return true;
  //   }
  //   return false;
  // }

}
