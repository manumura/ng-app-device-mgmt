import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';

import {MatListModule, MatIconModule} from '@angular/material';

import {SidenavComponent} from './sidenav.component';

import {SideNavService} from './service/side-nav.service';
import {SideNavServiceMock} from './service/side-nav-mock.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AuthenticationServiceMock} from '../../authentication/authentication-mock.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule,
        MatListModule,
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [SidenavComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {}},
        {provide: SideNavService, useClass: SideNavServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
