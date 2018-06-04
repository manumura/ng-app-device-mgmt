import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';

import {
  MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {DeviceDeleteComponent} from './device-delete.component';

import {DeviceService} from '../service/device.service';
import {DeviceServiceMock} from '../service/device-mock.service';
import {DeviceStatusService} from '../service/device-status.service';
import {DeviceStatusServiceMock} from '../service/device-status-mock.service';

import {APP_CONFIG} from '../../app.config';

describe('DeviceDeleteComponent', () => {
  let component: DeviceDeleteComponent;
  let fixture: ComponentFixture<DeviceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [DeviceDeleteComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: DeviceService, useClass: DeviceServiceMock},
        {provide: DeviceStatusService, useClass: DeviceStatusServiceMock},
        {provide: APP_CONFIG, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
