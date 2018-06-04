import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs'; // throwError
import { catchError, map } from 'rxjs/operators';

export abstract class AbstractService<T> {

  //  public dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  // Temporarily stores data from dialogs
  protected dialogData: any;

  //  get data(): T[] {
  //    return this.dataChange.value;
  //  }

  constructor(protected http: HttpClient,
    protected apiUrl: string) {
  }

  getDialogData() {
    return this.dialogData;
  }

  findAll(): Observable<T[]> {
    // TODO : Use interceptor to catch errors
    // return this.http.get<T[]>(this.apiUrl);
    return this.http.get<T[]>(this.apiUrl)
      .pipe(map(
        res => {
          return res;
        })
        // TODO : RxJS 6+ throwError
        // catchError(
        // (error) => {
        // return throwError(this.errorHandler(error));
        // })
        , catchError(
          (error: any) => {
            return throwError(this.errorHandler(error));
          })
      );
  }

  //  getAll(): void {
  //    this.http.get<T[]>(this.apiUrl)
  //      .subscribe(data => {
  //        this.dataChange.next(data);
  //      },
  //      (error: HttpErrorResponse) => {
  //        console.log(error.name + ' ' + error.message);
  //      });
  //  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(this.apiUrl + '/' + id)
      .pipe(map(res => res), catchError(
        (error: any) => throwError(this.errorHandler(error)
        ))
      );
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(this.apiUrl + '/' + id, entity)
      .pipe(map(res => {
        this.dialogData = res;
        return res;
      }), catchError(
        (error: any) => throwError(this.errorHandler(error)
        ))
      );
  }

  saveNgForm(entity: any): Observable<any> {
    let result: Observable<Object>;
    if (entity['id']) {
      result = this.http.put<T>(this.apiUrl, entity);
    } else {
      result = this.http.post<T>(this.apiUrl, entity);
    }
    return result;
  }

  save(entity: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity)
      .pipe(map(res => {
        this.dialogData = res;
        return res;
      }), catchError(
        (error: any) => throwError(this.errorHandler(error)
        ))
      );
  }

  deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id)
      .pipe(map(
        res => {
          return res;
        })
        , catchError(
          (error: any) => {
            return throwError(this.errorHandler(error));
          })
      );
  }

  saveWithFormData(formData: FormData, options: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(this.apiUrl, formData, options)
      .pipe(map(res => {
        this.dialogData = res;
        return res;
      }), catchError(
        (error: any) => throwError(this.errorHandler(error)
        ))
      );
  }

  updateWithFormData(id: number, formData: FormData, options: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(this.apiUrl + '/' + id, formData, options)
      .pipe(map(res => {
        this.dialogData = res;
        return res;
      }),
        catchError((error: any) => throwError(this.errorHandler(error))));
  }

  errorHandler(e: any): void {
    console.log(e);
    return e || 'Error';
  }

  // private handleError(operation: string, url: string) {
  //       return (err: any) => {
  //           const errMsg = 'Error in ' + operation + ' retrieving ' + url;
  //           console.log(errMsg + ': ', err);
  //           if (err instanceof HttpErrorResponse) {
  //               // you could extract more info about the error if you want, e.g.:
  //               console.log(`status: ${err.status}, ${err.statusText}`);
  //               // errMsg = ...
  //           }
  //           return Observable.throw(errMsg);
  //       };
  //   }

}
