import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Country} from './country.model';

@Injectable()
export class CountryService {

  private apiUrl = 'http://localhost:8090/country';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl)
      .pipe(
      map(
        res => {
          console.log(res);
          return res;
        }), catchError((error: any) => Observable.throw(this.errorHandler(error))));
  }

  errorHandler(e: any): void {
    console.log(e);
    return e || 'Error';
  }
}
