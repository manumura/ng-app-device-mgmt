import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../model/device.model';
import { DeviceService } from '../service/device.service';
import { DeviceDeleteComponent } from '../device-delete/device-delete.component';
import { DeviceCreateComponent } from '../device-create/device-create.component';
// import { AlertService } from '../../shared/alert/alert.service';
import { DeviceStatusService } from '../service/device-status.service';
import { Message } from 'primeng/components/common/api';
import { SimpleDialogComponent } from '../../shared/simple-dialog/simple-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, AfterViewInit {
  data: Array<Device>;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['timestamp', 'imei', 'status', 'requestBy', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;
  statuses: Array<any>;
  public alertMessages: Message[] = [];

  ngAfterViewInit() {
    this.refresh();
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private deviceService: DeviceService,
    // private alertService: AlertService,
    private deviceStatusService: DeviceStatusService,
    private changeDetectorRefs: ChangeDetectorRef,
    private simpleDialog: MatDialog) { }

  ngOnInit() {
    this.deviceStatusService.findAll().subscribe(result => {
      this.statuses = result;
    });
  }

  openDeleteDialog(id: string, imei: string) {
    this.dialog.open(DeviceDeleteComponent, {
      data: {
        id: id,
        imei: imei
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Device successfully deleted!');
        this.success('Device successfully deleted!');
        this.refresh();
      }
    });
  }

  openEditDialog(id: string) {
    this.dialog.open(DeviceCreateComponent,
      {
        data: {
          id: id,
          statuses: this.statuses
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          console.log('Device successfully updated!');
          this.success('Device successfully updated!');
          this.refresh();
        }
      });
  }

  refresh() {
    this.deviceService.findAll().subscribe(result => {
      this.data = result;
      // this.displayStatusText();
      this.dataSource = new MatTableDataSource(this.data);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.refreshPaginatorIndex();
      this.dataSource.sort = this.sort;
    });
  }

  refreshPaginatorIndex() {
    if (this.dataSource.data.length % this.paginator.pageSize === 0) {
      if (this.paginator.hasPreviousPage()) {
        this.dataSource.paginator.previousPage();
      }
    }
  }

  displayStatusText() {
    if (typeof this.statuses !== 'undefined' && this.statuses.length > 0) {
      for (const device of this.data) {
        device.statusText = '';
        const d = this.statuses.filter(function (status) {
          return status.id === device.status;
        })[0];
        if (d) {
          device.statusText = d.name;
        }
      }
    }
  }

  executeFilter(value: string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  success(message: string) {
    //    this.alertService.success(message);
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'success', summary: 'Success', detail: message });
  }

  error(message: string) {
    //    this.alertService.error(message);
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'error', summary: 'Error', detail: message });
  }

  info(message: string) {
    //    this.alertService.info(message);
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'info', summary: 'Info', detail: message });
  }

  warn(message: string) {
    //    this.alertService.warn(message);
    this.alertMessages = [];
    this.alertMessages.push({ severity: 'warn', summary: 'Warn', detail: message });
  }

  // clear() {
  //   this.alertService.clear();
  // }

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
