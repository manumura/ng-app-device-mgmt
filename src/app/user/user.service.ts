import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import {APP_CONFIG, AppConfig} from '../app.config';
import {AbstractService} from '../shared/service/abstract.service';
import {User} from './user.model';

@Injectable()
export class UserService extends AbstractService<User> {

  //  private readonly apiUrl = 'http://localhost:8090/user';

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(protected http: HttpClient,
    @Inject(APP_CONFIG) private conf: AppConfig) {
    super(http, conf.appsApiEndpoint + '/dm/api/v1//users');
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  searchByFirstName(terms: Observable<string>) {
    return terms.pipe(debounceTime(400)
      , distinctUntilChanged()
      , switchMap(term => this.findByFirstName(term)));
  }

  findByFirstName(term) {
    console.log('term: ', term);
    if (term) {
      return this.http.get(this.apiUrl + '/searchByFirstName/' + term)
        .pipe(
        map(
          res => {
            console.log(res);
            return res;
          }), catchError((error: any) => Observable.throw(this.errorHandler(error))));
    } else {
      return this.findAll();
    }
  }

  //  findAll(): Promise<User[]>  {
  //    return this.http.get(this.apiUrl).toPromise()
  //       .then((res: Response) => {
  //         console.log(res.json());
  //         return res.json() as User[];
  //       })
  //      .catch(this.handleError);
  //  }
  //
  //  findById(id: number): Promise<User> {
  //    return this.http.get(this.apiUrl + '/' + id).toPromise()
  //      .then((res: Response) => res.json() as User)
  //      .catch(this.handleError);
  //  }
  //
  //  updateUser(user: User): Promise<User> {
  //    return this.http.put(this.apiUrl + '/' + user.id, user).toPromise()
  //      .then((res: Response) => res.json() as User)
  //      .catch(this.handleError);
  //  }
  //
  //  saveUser(user: User): Promise<User> {
  //    return this.http.post(this.apiUrl, user).toPromise()
  //      .catch(this.handleError);
  //  }
  //
  //  deleteUserById(id: number): Promise<boolean> {
  //    return this.http.delete(this.apiUrl + '/' + id).toPromise()
  //      .then((res: Response) => res.json() as boolean)
  //      .catch(this.handleError);
  //  }
  //
  //  private handleError(error: any): Promise<any> {
  //    console.error('Error', error);
  //    return Promise.reject(error.message || error);
  //  }

}
