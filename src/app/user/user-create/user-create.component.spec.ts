import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {UserCreateComponent} from './user-create.component';

import {APP_CONFIG} from '../../app.config';

import {UserService} from '../user.service';
import {UserServiceMock} from '../user-mock.service';
import {CityService} from '../city/city.service';
import {CityServiceMock} from '../city/city-mock.service';
import {CountryService} from '../country/country.service';
import {CountryServiceMock} from '../country/country-mock.service';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
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
        MatDatepickerModule,
        MatMomentDateModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [UserCreateComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: CityService, useClass: CityServiceMock},
        {provide: CountryService, useClass: CountryServiceMock},
        {provide: UserService, useClass: UserServiceMock},
        {provide: APP_CONFIG, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
