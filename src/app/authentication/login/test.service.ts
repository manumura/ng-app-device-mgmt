import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ResponseContentType, RequestMethod } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TestService {

  //  private readonly apiUrl = 'http://localhost:18181/application';

  constructor(protected http: HttpClient) {
  }

  // TODO
  test(): Observable<any> {
    console.log('test');
    return this.http.post<any>('http://localhost:17172/test', 'test')
    // return this.http.get<any>('http://localhost:17172/test')
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  errorHandler(e: any): void {
    console.log(e);
    return e || 'Error';
  }

}
