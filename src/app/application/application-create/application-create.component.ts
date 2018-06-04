import {Component, ElementRef, OnDestroy, OnInit, AfterViewInit, Inject, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
// import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
// import {merge} from 'rxjs/observable/merge';
// import {fromEvent} from 'rxjs/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material';
import {MatSort, MatPaginator, MatSpinner} from '@angular/material'; // MatTableDataSource
// import {SelectionModel} from '@angular/cdk/collections';
import {FileUpload} from 'primeng/fileupload';
import {Message} from 'primeng/components/common/api';

import {ApplicationService} from '../service/application.service';
import {Application} from '../model/application.model';
import {LinkedApplication} from '../model/linked-application.model';
import {LinkedApplicationService} from '../service/linked-application.service';
import {LinkedApplicationDataSource} from '../service/linked-application.datasource';
import {ChannelService} from '../../channel/service/channel.service';
import {Channel} from '../../channel/model/channel.model';
import {DeviceTypeService} from '../../device/service/device-type.service';
import {DeviceType} from '../../device/model/device-type.model';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  public applicationForm: FormGroup;
  public channels: Channel[];
  public deviceTypes: DeviceType[];
  public title: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //  @ViewChild('filter') filter: ElementRef;

  //  msgs: Message[];
  apkFiles: File[] = [];
  uploadedFiles: File[] = [];
  @ViewChild('fileUpload') fileUpload: FileUpload;

  public application: Application = this.data.application;
  public displayedColumns = ['select', 'deviceType', 'application'];
  public datasource: LinkedApplicationDataSource | null;

  //  public selection: SelectionModel<LinkedApplication> = new SelectionModel<LinkedApplication>(true, []);
  private selection: LinkedApplication[] = new Array<LinkedApplication>();

  public alertMessages: Message[] = [];

  // TODO
  imageUrl: any;

  constructor(public dialogRef: MatDialogRef<ApplicationCreateComponent>,
    private applicationService: ApplicationService,
    private linkedApplicationService: LinkedApplicationService,
    private channelService: ChannelService,
    private deviceTypeService: DeviceTypeService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    // Linked applications datasource
    this.datasource = new LinkedApplicationDataSource(this.linkedApplicationService, this.sort, this.paginator, this.application);
    //    this.filterLinkedApplications();

    this.title = (this.application.appId) ? 'Update application ' + this.application.appId : 'Create new application';

    // Init form
    this.applicationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      channel: new FormControl('', Validators.required),
      deviceType: new FormControl('', Validators.required),
    });

    this.applicationForm.patchValue({
      name: this.application.name,
      channel: this.application.channel,
      deviceType: this.application.deviceType,
    });

    // Init channels and device types
    this.getAllChannels();
    this.getAllDeviceTypes();

    // Init selected linked apps
    if (this.application.dependencyList) {
      for (const linkedApp of this.application.dependencyList) {
        this.selection.push(linkedApp);
      }
    }

    // Init file
    this.applicationService.getFile(this.application.appId).subscribe(
      blob => {
//        console.log('File blob : ', res);
        if (blob) {
//          const urlCreator = window.URL;
//          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));

          const fileData = new Array<Blob>();
          fileData.push(blob);
          const file = new File(fileData, this.application.apkName,
            {type: 'image/png'}); // text/plain application/vnd.android.package-archive
          this.apkFiles.push(file);
        }
      },
      error => {
        this.errorHandler(error);
      }
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  //  filterLinkedApplications() {
  //    Observable.fromEvent(this.filter.nativeElement, 'keyup')
  //      .debounceTime(150)
  //      .distinctUntilChanged()
  //      .subscribe(() => {
  //        if (!this.datasource) {
  //          return;
  //        }
  //        this.datasource.filter = this.filter.nativeElement.value;
  //      });
  //  }

  select(linkedApp: LinkedApplication): void {
    const isSelected = this.selection.some(app => app.appId === linkedApp.appId);
    (isSelected) ?
      this.selection = this.selection.filter(app => app.appId !== linkedApp.appId)
      : this.selection.push(linkedApp);
    //    const index: number = this.selection.indexOf(linkedApp);
    //    (index !== -1) ? this.selection.splice(index, 1) : this.selection.push(linkedApp);
  }

  isChecked(linkedApp: LinkedApplication): boolean {
    return this.selection.some(app => app.appId === linkedApp.appId);
  }

  uploadHandler(event) {
    this.uploadedFiles.splice(0);
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onSubmit() {
    const isValid = this.validateData();
    if (isValid) {
      this.submit();
    }
  }

  private validateData(): boolean {
    let isValid = true;
    // Check uploaded file
    const apkFile = (this.uploadedFiles[0]) ? this.uploadedFiles[0] : this.apkFiles[0];
    if (!apkFile) {
      isValid = false;
      this.error('APK file is required');
    }
    return isValid;
  }

  private submit() {
    if (this.applicationForm.valid) {

      // Get uploaded file
      const apkFile = (this.uploadedFiles[0]) ? this.uploadedFiles[0] : this.apkFiles[0];

      const application: Application = new Application(
        this.application.appId,
        this.applicationForm.controls['name'].value,
        null, // description
        null, // apkData
        apkFile ? apkFile.name : '',
        // this.applicationForm.controls['channel'].value,
        this.applicationForm.value.channel,
        this.applicationForm.controls['deviceType'].value,
      );

      // Send data by form, not json (json + file content types)
      const formData = new FormData();

      // Application
      application.dependencyList = this.selection;
      formData.append('application', JSON.stringify(application));

      // Uploaded file
      formData.append('apkFile', apkFile, (apkFile) ? apkFile.name : '');

      const params = new HttpParams();
      const options = {
        params: params,
        reportProgress: true,
      };

      if (this.application.appId) {
        console.log('Updating application');
        this.applicationService.updateWithFormData(application.appId, formData, options).subscribe(
          res => {
            this.close(1);
          },
          error => {
            this.errorHandler(error);
          }
        );

      } else {
        console.log('Creating application');
        this.applicationService.saveWithFormData(formData, options).subscribe(
          (res) => {
            this.close(1);
          },
          error => {
            this.errorHandler(error);
          }
        );
      }
    }
  }

  private getAllChannels() {
    this.channelService.findAll().subscribe(
      channels => {
        this.channels = channels;
      },
      err => {
        this.errorHandler(err);
      });
  }

  private getAllDeviceTypes() {
    this.deviceTypeService.findAll().subscribe(
      deviceTypes => {
        this.deviceTypes = deviceTypes;
      },
      err => {
        this.errorHandler(err);
      });
  }

  compareChannelByIds(c1: Channel, c2: Channel): boolean {
    return c1 && c2 ? c1.distChannelId === c2.distChannelId : c1 === c2;
  }

  compareDeviceTypeByIds(d1: DeviceType, d2: DeviceType): boolean {
    return d1 && d2 ? d1.deviceTypeId === d2.deviceTypeId : d1 === d2;
  }

  onNoClick(): void {
    this.close(0);
  }

  private close(result: number): void {
    this.datasource.disconnect();
    this.applicationForm.reset();
    // TODO: test
    // this.applicationForm.reset({'name': 'Testname'});
    this.dialogRef.close(result);
  }

  private error(...messages): void {
    this.alertMessages = [];
    if (messages) {
      for (const message of messages) {
        this.alertMessages.push({severity: 'error', summary: 'Error', detail: message});
      }
    }
  }

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
    console.log('Test ', this.application.appId);
    this.applicationService.test(this.application.appId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.errorHandler(err);
      }
    );
//    console.log('selection: ', this.selection);
//    console.log('filteredData.length: ', this.datasource.filteredData.length);
  }

}
