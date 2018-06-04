import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort, MatPaginator } from '@angular/material';
import { catchError, finalize } from 'rxjs/operators';
import { Application } from '../model/application.model';
import { ApplicationService } from './application.service';

export class ApplicationDataSource extends DataSource<Application> {

  private appsSubject = new BehaviorSubject<Application[]>([]);

  get appsData(): Application[] {
    return this.appsSubject.value;
  }

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Application[] = [];
  renderedData: Application[] = [];

  constructor(public _applicationService: ApplicationService,
    public _sort: MatSort,
    public _paginator: MatPaginator) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  loadApps(): void {

    this._applicationService.findAll()
      .pipe(
        catchError(() => of([])),
    )
      .subscribe(apps => this.appsSubject.next(apps));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {

    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.appsSubject,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    //    this._applicationService.getAll();
    this.loadApps();

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.appsData.slice().filter((application: Application) => {

        let pos = -1;

        if (application) {
          const channelName = (application.channel) ? application.channel.name : '';
          const deviceTypeName = (application.deviceType) ? application.deviceType.name : '';

          const searchStr = (application.name + ' ' + application.apkName + ' ' + channelName + ' '
            + deviceTypeName).toLowerCase();
          pos = searchStr.indexOf(this.filter.toLowerCase());
        }

        return pos !== -1;
      });

      // Sort filtered data
      const sortedData = this.getSortedData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));
  }

  disconnect() {
    this.appsSubject.complete();
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: Application[]): Application[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | boolean = '';
      let propertyB: number | string | boolean = '';

      switch (this._sort.active) {
        case 'appId': [propertyA, propertyB] = [a.appId, b.appId]; break;
        case 'name': [propertyA, propertyB] = [a.name.toLowerCase(), b.name.toLowerCase()]; break;
        case 'description': [propertyA, propertyB] = [a.description.toLowerCase(), b.description.toLowerCase()]; break;
        case 'apkName': [propertyA, propertyB] = [a.apkName.toLowerCase(), b.apkName.toLowerCase()]; break;
        //        case 'createdDateTime':
        //          const createdDateTimeA = (a.createdDateTime) ? new Date(a.createdDateTime).getTime() : 0;
        //          const createdDateTimeB = (b.createdDateTime) ? new Date(b.createdDateTime).getTime() : 0;
        //          [propertyA, propertyB] = [createdDateTimeA, createdDateTimeB];
        //          break;
        //        case 'updatedDateTime':
        //          const updatedDateTimeA = (a.updatedDateTime) ? new Date(a.updatedDateTime).getTime() : 0;
        //          const updatedDateTimeB = (b.updatedDateTime) ? new Date(b.updatedDateTime).getTime() : 0;
        //          [propertyA, propertyB] = [updatedDateTimeA, updatedDateTimeB];
        //          break;
        //        case 'isActive': [propertyA, propertyB] = [a.isActive, b.isActive]; break;
        case 'channel':
          const channelNameA = (a.channel) ? a.channel.name.toLowerCase() : '';
          const channelNameB = (b.channel) ? b.channel.name.toLowerCase() : '';
          [propertyA, propertyB] = [channelNameA, channelNameB];
          break;
        case 'deviceType':
          const deviceTypeNameA = (a.deviceType) ? a.deviceType.name.toLowerCase() : '';
          const deviceTypeNameB = (b.deviceType) ? b.deviceType.name.toLowerCase() : '';
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
