import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {DOCUMENT, ɵparseCookieValue as parseCookieValue} from "@angular/common";

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  cookieName = '_csrf';
  lastToken = '';
  lastCookieString = '';

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
              @Inject(DOCUMENT) private doc: any,
              @Inject(PLATFORM_ID) private platform: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.platform === 'server') {
      return next.handle(req);
    }
    const cookieString = this.doc.cookie || '';
    console.log('cookieString: ', cookieString);
    if (cookieString !== this.lastCookieString) {
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    let token = this.lastToken;
    // let token = this.tokenExtractor.getToken() as string;
    console.log('CSRF token: ', token);

    const headerName = 'X-CSRF-TOKEN';
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }
}
