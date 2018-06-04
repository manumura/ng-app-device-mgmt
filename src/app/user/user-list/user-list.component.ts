import { Component, ElementRef, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Observable, Subject, fromEvent } from 'rxjs';
import { merge, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, MatPaginator } from '@angular/material'; // MatTableDataSource
import { SelectionModel } from '@angular/cdk/collections';

import { SimpleDialogComponent } from '../../shared/simple-dialog/simple-dialog.component';
// import {AlertComponent} from '../../shared/alert/alert.component';
import { AlertService } from '../../shared/alert/alert.service';

// import {FilterPipe} from '../../shared/pipe/filter.pipe';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UserDataSource } from '../user.datasource';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {

  public users: User[];
  //  public usersObservable: Observable<User[]>;
  //  private confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;

  //  public searchTerm$ = new Subject<string>();
  //  public selectedRowIndex = -1;
  public selection = new SelectionModel<User>(true, []); // allowMultiSelect, initialSelection

  public displayedColumns = ['select', 'id', 'firstName', 'lastName', 'email', 'birthDate',
    'salary', 'country', 'city', 'married', 'gender', 'actions'];
  //  matTableDataSource: MatTableDataSource<User>;
  userDatasource: UserDataSource | null;

  constructor(private router: Router,
    private userService: UserService,
    private confirmationDialog: MatDialog,
    private simpleDialog: MatDialog,
    public dialog: MatDialog,
    private alertService: AlertService) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.userDatasource = new UserDataSource(this.userService, this.sort, this.paginator);
    this.getAllUsers();
  }

  ngAfterViewInit() {
    // selection changed
    this.selection.onChange.subscribe((user) => {
      // will be undefined if no selection
      if (user.added[0]) {
        console.log('New user id selected ' + user.added[0].id);
        console.log('Users selected: ', this.selection.selected);
      }
    });
  }

  ngOnDestroy() {
  }

  //  ngOnChanges(...args: any[]) {
  //        console.log('changing', args);
  //    }

  select(row) {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
  }

  /** Whether all filtered rows are selected. */
  isAllFilteredRowsSelected() {
    return this.userDatasource.filteredData.every(data => this.selection.isSelected(data));
  }

  /** Whether the selection it totally matches the filtered rows. */
  isMasterToggleChecked() {
    return this.selection.hasValue() &&
      this.isAllFilteredRowsSelected() &&
      this.selection.selected.length >= this.userDatasource.filteredData.length;
  }

  /**
   * Whether there is a selection that doesn't capture all the
   * filtered rows there are no filtered rows displayed.
   */
  isMasterToggleIndeterminate() {
    return this.selection.hasValue() &&
      (!this.isAllFilteredRowsSelected() || !this.userDatasource.filteredData.length);
  }

  /** Selects all filtered rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isMasterToggleChecked()) {
      this.selection.clear();
    } else {
      this.userDatasource.filteredData.forEach(data => this.selection.select(data));
    }
  }

  //  refresh() {
  //    this.getAllUsers();
  //  }

  private refreshTable() {
    //    console.log('Refresh table');
    // if there's a paginator active we're using it for refresh
    if (this.userDatasource._paginator.hasNextPage()) {
      this.userDatasource._paginator.nextPage();
      this.userDatasource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.userDatasource._paginator.hasPreviousPage()) {
      this.userDatasource._paginator.previousPage();
      this.userDatasource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.userDatasource.filter = '';
      this.userDatasource.filter = this.filter.nativeElement.value;
    }
  }

  findAll() {
    console.log('Find all');
    //    this.usersObservable = this.userService.findAll();
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        this.errorHandler(err);
      });
  }

  getAllUsers() {
    console.log('Get all Users');
    //    this.userDatasource = new UserDataSource(this.userService, this.sort, this.paginator);
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged())
      .subscribe(() => {
        if (!this.userDatasource) {
          return;
        }
        this.userDatasource.filter = this.filter.nativeElement.value;
      });
  }

  deleteUser(user: User) {
    console.log('Delete User');

    if (user) {
      const dialogRef = this.dialog.open(UserDeleteComponent, {
        data: { user: user }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          console.log('User deleted successfully');
          this.success('User deleted successfully');
          const foundIndex = this.userService.dataChange.value.findIndex(x => x.id === user.id);
          // for delete we use splice in order to remove single object from DataService
          this.userService.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }
      });
    }
  }

  //  deleteUser(user: User) {
  //    console.log('Delete User');
  //
  //    if (user) {
  //
  //      // open confirm dialog
  //      // https://stackoverflow.com/questions/34205593/working-example-of-angular-2-0-material-mddialog-with-angular-2-0
  //      // https://stackoverflow.com/questions/47814104/cant-resolve-all-parameters-for-matdialogref-angular-4
  //      // https://stackoverflow.com/questions/42455358/material-2-dialog-change-style
  //      this.confirmationDialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
  //        disableClose: false,
  //      });
  //      this.confirmationDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this user ?';
  //
  //      this.confirmationDialogRef.afterClosed().subscribe(result => {
  //        if (result) {
  //          // do confirmation actions
  //          console.log('Confirm');
  //          this.userService.deleteUserById(user.id).subscribe(
  //            res => {
  ////              this.getAllUsers();
  ////              this.refreshTable();
  //              this.router.navigate(['/user']);
  //              console.log('Delete done');
  //            },
  //            err => {
  //              this.errorHandler(err);
  //            }
  //          );
  //        } else {
  //          // cancel
  //          console.log('Cancel');
  //        }
  //        this.confirmationDialogRef = null;
  //      });
  //    }
  //  }

  //  redirectNewUserPage() {
  //    this.router.navigate(['/user/create']);
  //  }

  createUser() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      disableClose: true,
      data: { user: new User() }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('User created successfully');
        this.success('User created successfully');
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside userService
        this.userService.dataChange.value.push(this.userService.getDialogData());
        this.refreshTable();
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      disableClose: true,
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('User updated successfully');
        this.success('User updated successfully');
        // When using an edit things are little different, firstly we find record by id
        const foundIndex = this.userService.dataChange.value.findIndex(x => x.id === user.id);
        // Then you update that record using data from dialogData (values you entered)
        this.userService.dataChange.value[foundIndex] = this.userService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  //  editUserPage(user: User) {
  //    console.log('Edit User');
  //    if (user) {
  //      this.router.navigate(['/user/edit', user.id]);
  //    }
  //  }

  test() {
    console.log('Test');
    this.userService.deleteById(99999).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }

  errorHandler(e: any): void {

    this.simpleDialogRef = this.simpleDialog.open(SimpleDialogComponent, {
      disableClose: false,
    });
    this.simpleDialogRef.componentInstance.title = 'Error';

    console.log('Error : ', e);

    if (e.status === 0) {
      const messages = new Array();
      messages.push('Cannot connect to server');
      this.simpleDialogRef.componentInstance.messages = messages;
    } else if (e.error.errorMessages === undefined || e.error.errorMessages === null) {
      const messages = new Array();
      messages.push('An unexpected error occured');
      this.simpleDialogRef.componentInstance.messages = messages;
    } else {
      this.simpleDialogRef.componentInstance.messages = e.error.errorMessages;
    }
  }

}
