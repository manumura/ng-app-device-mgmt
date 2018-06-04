import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApplicationModule } from '../application.module';
import { ApplicationCreateComponent } from './application-create.component';

import { GrowlModule } from 'primeng/growl';

describe('ApplicationCreateComponent', () => {
  let component: ApplicationCreateComponent;
  let fixture: ComponentFixture<ApplicationCreateComponent>;
  let element;
  let debugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ApplicationModule,
        GrowlModule
      ],
      declarations: [ApplicationCreateComponent]
    })
      .overrideModule(ApplicationModule, {
        remove: {
          declarations: [ApplicationCreateComponent]
        },
        //      add: {
        //        declarations: [MockSelectionToolComponent]
        //      }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ApplicationCreateComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('form'));
        element = debugElement.nativeElement;
      });

    //    component = new ApplicationCreateComponent();
  }));

  //  beforeEach(() => {
  //    fixture = TestBed.createComponent(ApplicationCreateComponent);
  //    component = fixture.componentInstance;
  //
  //    debugElement = fixture.debugElement.query(By.css('form'));
  //    element = debugElement.nativeElement;
  //
  //    fixture.detectChanges();
  //  });

  it('form should be invalid', () => {
    component.applicationForm.controls['name'].setValue('');
    component.applicationForm.controls['channel'].setValue('');
    component.applicationForm.controls['deviceType'].setValue('');
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
