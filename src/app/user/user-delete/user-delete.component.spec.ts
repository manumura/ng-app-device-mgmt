import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';

import {
  MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {UserDeleteComponent} from './user-delete.component';

import {UserService} from '../user.service';
import {UserServiceMock} from '../user-mock.service';

import {APP_CONFIG} from '../../app.config';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [UserDeleteComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: UserService, useClass: UserServiceMock},
        {provide: APP_CONFIG, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
