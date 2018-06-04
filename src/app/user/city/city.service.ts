import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {City} from './city.model';

@Injectable()
export class CityService {

  private apiUrl = 'http://localhost:8090/city';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl)
      .pipe(
      map(
        res => {
          console.log(res);
          return res;
        }), catchError((error: any) => Observable.throw(this.errorHandler(error))));
  }

  findAllByCountryId(countryId: number): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl + '/country/' + countryId)
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
