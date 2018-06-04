import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of, merge} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSort, MatPaginator} from '@angular/material';
import {catchError, finalize} from 'rxjs/operators';
import {User} from './user.model';
import {UserService} from './user.service';

export class UserDataSource extends DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);

  get appsData(): User[] {
    return this.usersSubject.value;
  }

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _userService: UserService,
    public _sort: MatSort,
    public _paginator: MatPaginator) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  loadUsers(): void {

    this._userService.findAll()
      .pipe(
        catchError(() => of([])),
      )
      .subscribe(users => this.usersSubject.next(users));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

//    this._userService.getAll();
    this.loadUsers();

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._userService.data.slice().filter((user: User) => {

        if (user) {
          const datePipe = new DatePipe('en-GB');
          const birthDate = (user.birthDate) ? datePipe.transform(user.birthDate, 'dd/MM/yyyy') : '';
          const countryName = (user.country) ? user.country.name : '';
          const cityName = (user.city) ? user.city.name : '';

          const searchStr = (user.id + ' ' + user.firstName + ' ' + user.lastName + ' ' + user.email + ' '
            + user.salary + ' ' + user.married + ' ' + user.gender + ' ' + countryName + ' '
            + cityName + ' ' + birthDate).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        }
      });

      // Sort filtered data
      const sortedData = this.getSortedData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
//       return sortedData;
    }));
  }

  disconnect() {
    this.usersSubject.complete();
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
       return data;
    }

    return data.sort((a, b) => {
      let propertyA: number|string|boolean = '';
      let propertyB: number|string|boolean = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'birthDate':
          const birthDateA = (a.birthDate) ? new Date(a.birthDate).getTime() : 0;
          const birthDateB = (b.birthDate) ? new Date(b.birthDate).getTime() : 0;
          [propertyA, propertyB] = [birthDateA, birthDateB];
          break;
        case 'salary': [propertyA, propertyB] = [a.salary, b.salary]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        case 'gender': [propertyA, propertyB] = [a.gender, b.gender]; break;
        case 'married': [propertyA, propertyB] = [a.married, b.married]; break;
        case 'country':
          const countryNameA = (a.country) ? a.country.name : '';
          const countryNameB = (b.country) ? b.country.name : '';
          [propertyA, propertyB] = [countryNameA, countryNameB];
           break;
        case 'city':
          const cityNameA = (a.city) ? a.city.name : '';
          const cityNameB = (b.city) ? b.city.name : '';
          [propertyA, propertyB] = [cityNameA, cityNameB];
          break;
        default: break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
