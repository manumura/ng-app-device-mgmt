import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';
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
import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

// import {UserModule} from '../user.module';
import {UserListComponent} from './user-list.component';

import {SharedModule} from '../../shared/shared.module';
import {APP_CONFIG} from '../../app.config';

import {UserService} from '../user.service';
import {UserServiceMock} from '../user-mock.service';
import {CityService} from '../city/city.service';
import {CityServiceMock} from '../city/city-mock.service';
import {CountryService} from '../country/country.service';
import {CountryServiceMock} from '../country/country-mock.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, // UserModule
        RouterTestingModule,
        HttpClientTestingModule,
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
        MatDatepickerModule,
        MatMomentDateModule],
      declarations: [UserListComponent], // AlertComponent
      providers: [
        {provide: CityService, useClass: CityServiceMock},
        {provide: CountryService, useClass: CountryServiceMock},
        {provide: UserService, useClass: UserServiceMock},
        {provide: APP_CONFIG, useValue: {}},
      ]
    })
      //      .overrideModule(UserModule, {
      //        remove: {
      //          declarations: [UserListComponent]S
      //        },
      //      })
      //      .overrideModule(SharedModule, {
      //        remove: {
      //          declarations: [AlertComponent]
      //        },
      //      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
