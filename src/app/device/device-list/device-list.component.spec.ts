import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatDialogModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {MatDialog, MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {GrowlModule} from 'primeng/growl';

import {DeviceListComponent} from './device-list.component';

import {SharedModule} from '../../shared/shared.module';
import {APP_CONFIG} from '../../app.config';

import {DeviceService} from '../service/device.service';
import {DeviceServiceMock} from '../service/device-mock.service';
import {DeviceStatusService} from '../service/device-status.service';
import {DeviceStatusServiceMock} from '../service/device-status-mock.service';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatToolbarModule,
        MatTooltipModule,
        GrowlModule],
      declarations: [DeviceListComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {}}, //useValue: {params: Observable.of({id: 123})}
        {provide: DeviceService, useClass: DeviceServiceMock},
        {provide: DeviceStatusService, useClass: DeviceStatusServiceMock},
        {provide: APP_CONFIG, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
