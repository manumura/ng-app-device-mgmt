import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CURRENT_USER } from '../../constant/auth.constant';

@Injectable()
export class AuthTokenHeaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // use the token as authorization header if available
    const loggedUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (loggedUser && loggedUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUser.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}

    // http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
    // https://theinfogrid.com/tech/developers/angular/angular-5-token-based-authentication/
    // https://spring.io/guides/tutorials/spring-security-and-angular-js/
    // TODO
//    return next.handle(req).do((event: HttpEvent<any>) => {
//      if (event instanceof HttpResponse) {
//        // do stuff with response if you want
//      }
//    }, (err: any) => {
//      if (err instanceof HttpErrorResponse {
//        if (err.status === 401) {
//          // redirect to the login route
//          // or show a modal
//        }
//      if (error.status === 419) {
//      return authService.refreshToken().flatmap(t => {
//        this.inflightAuthRequest = null;
//        const authReq = req.clone({ headers: req.headers.set('authorization', t) });
//        return next.handle(authReq); //refresh was success, resend the original request
//    });
//      }
//    });

    // In authenticationService :
//     refreshToken(): Observable<string> {
//    let refreshAuth = this.getRefreshToken(); //get refresh token from storage
//    let url: string = BASE_URL + "auth/refresh";
//    return this.http.get(url, {
//      headers: new HttpHeaders().set('refreshAuthorization', refreshAuth),
//      observe: 'response'
//    }).map(refreshResponse => {
//      let authToken: string = refreshResponse.headers.get('authorizationToken');
//      let refreshToken: string = refreshResponse.headers.get('refreshToken');
//      //add token to storage
//      this.createToken(authToken, refreshToken); // method for adding token to cookie storage
//      return authToken; //return the new authorization token
//    });
//  }
