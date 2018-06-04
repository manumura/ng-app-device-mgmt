import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationModule} from '../application.module';
import {ApplicationListComponent} from './application-list.component';

describe('ApplicationListComponent', () => {
  let component: ApplicationListComponent;
  let fixture: ComponentFixture<ApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationListComponent]
    })
      .overrideModule(ApplicationModule, {
        remove: {
          declarations: [ApplicationListComponent]
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
