import { Component, ElementRef, ChangeDetectorRef, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Observable, Subject, fromEvent } from 'rxjs';
import { merge, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Message } from 'primeng/components/common/api';

// import {SimpleDialogComponent} from '../../shared/simple-dialog/simple-dialog.component';
// import {AlertComponent} from '../../shared/alert/alert.component';
// import {AlertService} from '../../shared/alert/alert.service';

import { Application } from '../model/application.model';
import { ApplicationService } from '../service/application.service';
import { ApplicationDataSource } from '../service/application.datasource';
import { ApplicationCreateComponent } from '../application-create/application-create.component';
import { ApplicationDeleteComponent } from '../application-delete/application-delete.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit, AfterViewInit {

  public applications: Application[];
  //  private confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  // private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;
  public displayedColumns = ['channel', 'deviceType', 'name', 'apkName', 'actions'];
  public datasource: ApplicationDataSource | null;
  public alertMessages: Message[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  data: Application[];
  dataSource: MatTableDataSource<Application> = new MatTableDataSource<Application>([]);

  constructor(private router: Router,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    // private alertService: AlertService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    //    this.datasource = new ApplicationDataSource(this.applicationService, this.sort, this.paginator);
    //    this.getAllApplications();
    this.refresh(false);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  getAllApplications() {
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(() => {
        if (!this.datasource) {
          return;
        }
        this.datasource.filter = this.filter.nativeElement.value;
      });
  }

  deleteApplication(application: Application) {
    if (application) {
      const dialogRef = this.dialog.open(ApplicationDeleteComponent, {
        data: { application: application }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          console.log('Application deleted successfully');
          this.success('Application deleted successfully');
          //          const foundIndex = this.datasource.appsData.findIndex(x => x.appId === application.appId);
          //          // for delete we use splice in order to remove single object from DataService
          //          this.datasource.appsData.splice(foundIndex, 1);
          //          this.refreshTable();
          //          this.refreshPaginatorIndex();
          this.refresh(true);
          this.refreshPaginatorIndex();
        }
      });
    }
  }

  createApplication() {
    const dialogRef = this.dialog.open(ApplicationCreateComponent, {
      disableClose: true,
      data: { application: new Application() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Application created successfully');
        this.success('Application created successfully');
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside userService
        //        this.datasource.appsData.push(this.applicationService.getDialogData());
        //        this.refreshTable();
        this.refresh(false);
      }
    });
  }

  editApplication(application: Application) {
    if (application) {
      const dialogRef = this.dialog.open(ApplicationCreateComponent, {
        disableClose: true,
        data: { application: application }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          console.log('Application updated successfully');
          this.success('Application updated successfully');
          // When using an edit things are little different, firstly we find record by id
          //          const foundIndex = this.datasource.appsData.findIndex(x => x.appId === application.appId);
          //          // Then you update that record using data from dialogData (values you entered)
          //          this.datasource.appsData[foundIndex] = this.applicationService.getDialogData();
          //          // And lastly refresh table
          //          this.refreshTable();
          this.refresh(false);
        }
      });
    }
  }

  private refreshTable() {
    // console.log('Refresh table');
    // if there's a paginator active we're using it for refresh
    if (this.datasource._paginator.hasNextPage()) {
      this.datasource._paginator.nextPage();
      this.datasource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.datasource._paginator.hasPreviousPage()) {
      this.datasource._paginator.previousPage();
      this.datasource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.datasource.filter = '';
      this.datasource.filter = this.filter.nativeElement.value;
    }
  }

  private refresh(shouldRefreshPagination: boolean) {
    this.applicationService.findAll().subscribe(result => {
      console.log('Data refreshed');
      this.data = result;
      // this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.data = result;

      this.dataSource.filterPredicate =
        (app: Application, appFilter: string) => this.filterPredicate(app, appFilter);

      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.filter.nativeElement.value) {
        this.executeFilter(this.filter.nativeElement.value);
      }

      if (shouldRefreshPagination) {
        this.refreshPaginatorIndex();
      }
    });
  }

  private filterPredicate(application: Application, appFilter: string): boolean {
    let pos = -1;

    if (application) {
      const channelName = (application.channel) ? application.channel.name : '';
      const deviceTypeName = (application.deviceType) ? application.deviceType.name : '';

      const searchStr = (application.name + ' ' + application.apkName + ' ' + channelName + ' '
        + deviceTypeName).toLowerCase();
      pos = searchStr.indexOf(appFilter.toLowerCase());
    }

    return pos !== -1;
  }

  private refreshPaginatorIndex() {
    //    if (this.datasource.appsData.length % this.datasource._paginator.pageSize === 0) {
    //      console.log('Refresh paginator');
    //      if (this.datasource._paginator.hasPreviousPage()) {
    //        this.datasource._paginator.previousPage();
    //      }
    //    }

    if (this.dataSource.filteredData.length % this.paginator.pageSize === 0) {
      console.log('Refresh paginator');
      if (this.paginator.hasPreviousPage()) {
        this.dataSource.paginator.previousPage();
      }
    }
  }

  executeFilter(value: string) {
    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  success(...messages) {
    //    this.alertService.success(message);
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({ severity: 'success', summary: 'Success', detail: message });
      }
    }
  }

  error(...messages) {
    //    this.alertService.error(message);
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({ severity: 'error', summary: 'Error', detail: message });
      }
    }
  }

  info(...messages) {
    //    this.alertService.info(message);
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({ severity: 'info', summary: 'Info', detail: message });
      }
    }
  }

  warn(...messages) {
    //    this.alertService.warn(message);
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({ severity: 'warn', summary: 'Warn', detail: message });
      }
    }
  }

  // clear() {
  //   this.alertService.clear();
  // }

  errorHandler(e: any): void {

    console.log('Error : ', e);
    const messages: string[] = [];

    if (e.status === 0) {
      messages.push('Cannot connect to server');
    } else if (e.error.errorMessages === undefined || e.error.errorMessages === null) {
      messages.push('An unexpected error occured');
    } else {
      messages.push(e.error.errorMessages);
    }

    this.error(messages);
  }

  // TODO
  test() {
    console.log('Test ', this.datasource._paginator.pageIndex);
  }
}
