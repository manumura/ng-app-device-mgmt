import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';

import {APP_CONFIG, AppConfig} from '../../app.config';
import {AbstractService} from '../../shared/service/abstract.service';
import {LinkedApplication} from '../model/linked-application.model';

@Injectable()
export class LinkedApplicationService {

  private readonly apiUrl: string;

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    this.apiUrl = conf.appsApiEndpoint + '/api/apps';
  }

  findAllLinkedApplications(id: number): Observable<LinkedApplication[]> {

    let url = this.apiUrl + '/linked-apps/';
    if (id) {
      url = url + id;
    }

    return this.http.get<LinkedApplication[]>(url)
      .pipe(
      map(res => {
        return res;
      }), catchError((error: any) => Observable.throw(this.errorHandler(error))));
  }

  errorHandler(e: any): void {
    console.log(e);
    return e || 'Error';
  }

}
