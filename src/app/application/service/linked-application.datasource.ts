import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of, merge } from 'rxjs';
import {MatSort, MatPaginator} from '@angular/material';
import {catchError, finalize, map} from 'rxjs/operators';
import {Application} from '../model/application.model';
import {LinkedApplication} from '../model/linked-application.model';
import {LinkedApplicationService} from './linked-application.service';

export class LinkedApplicationDataSource extends DataSource<LinkedApplication> {

  private linkedAppsSubject = new BehaviorSubject<LinkedApplication[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  get linkedAppsData(): LinkedApplication[] {
    return this.linkedAppsSubject.value;
  }

//  _filterChange = new BehaviorSubject('');
//
//  get filter(): string {
//    return this._filterChange.value;
//  }
//
//  set filter(filter: string) {
//    this._filterChange.next(filter);
//  }

  filteredData: LinkedApplication[] = [];
  renderedData: LinkedApplication[] = [];

  constructor(public _linkedApplicationService: LinkedApplicationService,
    public _sort: MatSort,
    public _paginator: MatPaginator,
    private _application: Application) {
    super();
    // Reset to the first page when the user changes the filter.
//    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  loadLinkedApps(appId: number): void {

    this.loadingSubject.next(true);

    this._linkedApplicationService.findAllLinkedApplications(appId)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(apps => this.linkedAppsSubject.next(apps));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<LinkedApplication[]> {

//    console.log('Connecting data source');

    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
//      this._linkedApplicationService.linkedApplicationsDataChange,
      this.linkedAppsSubject,
      this._sort.sortChange,
//      this._filterChange,
      this._paginator.page
    ];

//    this._linkedApplicationService.getAllLinkedApplications(this._application.appId);
    this.loadLinkedApps(this._application.appId);

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.linkedAppsData.slice();
//      this.filteredData = this._linkedApplicationService.linkedApplicationsData.slice().filter((app: LinkedApplication) => {
//      this.filteredData = this.linkedAppsData.slice().filter((app: LinkedApplication) => {
//
//        let pos = -1;
//
//        if (app) {
//          const deviceTypeName = (app.deviceType) ? app.deviceType.name : '';
//          const searchStr = (app.name + ' ' + deviceTypeName).toLowerCase();
//          pos = searchStr.indexOf(this.filter.toLowerCase());
//        }
//
//        return pos !== -1;
//      });

      // Sort filtered data
      const sortedData = this.getSortedData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));
  }

  disconnect() {
//    console.log('Disconnecting data source');
    this.linkedAppsSubject.complete();
    this.loadingSubject.complete();
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: LinkedApplication[]): LinkedApplication[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | boolean = '';
      let propertyB: number | string | boolean = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase()]; break;
        case 'deviceType':
          const deviceTypeNameA = (a.deviceType) ? a.deviceType.name.toLocaleLowerCase() : '';
          const deviceTypeNameB = (b.deviceType) ? b.deviceType.name.toLocaleLowerCase() : '';
          [propertyA, propertyB] = [deviceTypeNameA, deviceTypeNameB];
          break;
        default: break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
