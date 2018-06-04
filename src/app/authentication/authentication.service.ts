import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CURRENT_USER,
  TOKEN_AUTHENTICATION_ENDPOINT,
  TOKEN_AUTH_PASSWORD,
  TOKEN_AUTH_USERNAME,
  TOKEN_NAME, TOKEN_EXPIRY, TOKEN_EXPIRY_VALUE
} from '../constant/auth.constant';

// Angular 6+
@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {

    const body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&grant_type=password';
    console.log(body);
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post<any>(TOKEN_AUTHENTICATION_ENDPOINT, body, { headers: headers })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a token in the response
        if (user && user.hasOwnProperty(TOKEN_NAME)) {
          // store user details and token in local storage to keep user logged in
          localStorage.setItem(CURRENT_USER, JSON.stringify(user));
          const expiry = new Date();
          if (user.expires_in) {
            expiry.setTime(expiry.getTime() + (parseInt(user.expires_in, 10) * 1000));
          } else {
            expiry.setTime(expiry.getTime() + (TOKEN_EXPIRY_VALUE * 1000));
          }
          // store the token expiry date for validation.
          localStorage.setItem(TOKEN_EXPIRY, expiry.toString());
          this.loggedIn.next(true);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
    this.loggedIn.next(false);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  refresh() {
    console.log('Current user: ', localStorage.getItem(CURRENT_USER));
    console.log('Token expiry', localStorage.getItem(TOKEN_EXPIRY));
    if (localStorage.getItem(CURRENT_USER) && !this.isExpired()) {
      this.loggedIn.next(true);
    }
  }

  // Checks if the token is expired then remove it from the storage.
  isExpired(): boolean {
    const expiryDate = new Date(localStorage.getItem(TOKEN_EXPIRY));
    const current = new Date();
    if (expiryDate && current > expiryDate) {
      localStorage.removeItem(CURRENT_USER);
      return true;
    }
    return false;
  }

}
