import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ResponseContentType, RequestMethod } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../../app.config';
import { AbstractService } from '../../shared/service/abstract.service';
import { Application } from '../model/application.model';

@Injectable()
export class ApplicationService extends AbstractService<Application> {

  //  private readonly apiUrl = 'http://localhost:18181/application';

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/api/apps');
  }

  getFile(id: number): Observable<Blob> {
    return this.http.get(this.apiUrl + '/' + id + '/file', { responseType: 'blob' })
      .pipe(
        map(res => {
          return res;
        }),
        catchError((error: any) => Observable.throw(this.errorHandler(error))));
  }

  // TODO
  test(id: number): Observable<any> {
    console.log('test');
    return this.http.get(this.apiUrl + '/test/' + id)
      .pipe(
        map(res => {
          this.dialogData = res;
          return res;
        }),
        catchError((error: any) => Observable.throw(this.errorHandler(error))));
  }

}
